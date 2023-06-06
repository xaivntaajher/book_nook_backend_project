import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import ReviewList from '../../components/ReviewList/ReviewList';
import AddFavorite from '../FavoritesPage/AddFavorite';
import { Link } from 'react-router-dom';

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
          <h2>{book.volumeInfo.title}</h2>
          <p>Author(s): {book.volumeInfo.authors}</p>
          <p>Description: {book.volumeInfo.description}</p>
          {book.volumeInfo.imageLinks && (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
            />
          )}
          <button
            className={`favorite-button ${
              isFavorite ? 'favorite-button-yellow' : 'favorite-button-black'
            }`}
            onClick={handleFavorite}
          >
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>
        </div>
      )}

      <Link to="/add_review">
        <p>Review Form</p>
      </Link>

      <ReviewList
        reviews={reviews}
        book={book}
        handleReview={handleReview}
        user={user}
      />
    </div>
  );
};

export default BookDetailPage;