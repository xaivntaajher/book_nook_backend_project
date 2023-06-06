import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import ReviewList from '../../components/ReviewList/ReviewList';
import AddFavorite from '../FavoritesPage/AddFavorite';
import { Link } from 'react-router-dom';
import '../BookDetailPage/BookDetailPage.css'

const BookDetailPage = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [user, token] = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [newFavorite, setNewFavorite] = useState(null);

  const fetchBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${book_id}/`
      );
      setBook(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async () => {
    try {
      const defaultValues = {
        book_id: book_id,
        title: book.volumeInfo.title,
        thumbnail_url: book.volumeInfo.imageLinks.thumbnail,
      };

      const response = await axios.post(
        'http://localhost:5000/api/user_favorites/',
        defaultValues,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      console.log(response.data);
      setNewFavorite(response.data);
      setIsFavorite((prevState) => !prevState);
    } catch (error) {
      console.error('Error posting new favorite', error);
    }
  };

  const fetchBookInformation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/book_information/${book_id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user_reviews/${book_id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchBookInformation();
  }, [book_id, token]);

  return (
    <div>
      {book && (
        <div>
          <h2 className='text-center'>{book.volumeInfo.title}</h2>
          <p className='text-center'>Author(s): {book.volumeInfo.authors}</p>
          <div className='container-1'>
          <div>
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title} className='img'
              />
            )}
            </div>
          <div className='description'>Description: {book.volumeInfo.description}</div>
          </div>
          <div className='favorite-btn'>
            <button
              className={`${
                isFavorite ? 'favorite-button-yellow' : 'favorite-button-black'
              }`}
              onClick={handleFavorite}
            >
              {isFavorite ? 'Favorited' : 'Favorite'}
            </button>
          </div>
        </div>
      )}
      <div>
        <Link to="/add_review">
          <p className='review'>Review Form</p>
        </Link>
      </div>
      <div>
      <ReviewList
        reviews={reviews}
        book={book}
        handleReview={handleReview}
        user={user}
      />
      </div>

    </div>
  );
};

export default BookDetailPage;