import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const BookDetailPage = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [user, token] = useAuth();

  const fetchBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${book_id}`
      );
      setBook(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/book_reviews/${book_id}`,
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

  const handleFavorite = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/favorite`,
        { book_id },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      if (response.status === 200) {
        // Update book.is_favorited in state
        setBook((prevBook) => ({
          ...prevBook,
          is_favorited: true,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = async () => {
    // Implement your logic to post a review
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
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
          <button onClick={handleFavorite}>
            {book.is_favorited ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      )}

      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <div key={review.id}>
              <p>{review.text}</p>
              <p>{review.rating}</p>
            </div>
          ))}
          <p>Average Rating: {book?.average_rating}</p>
        </div>
      ) : (
        <p>No reviews found for this book.</p>
      )}

      {user && (
        <div>
          <h3>Add a Review</h3>
          <form onSubmit={handleReview}>
            <textarea
              rows="4"
              cols="50"
              placeholder="Enter your review..."
            ></textarea>
            <input type="number" placeholder="Rating" min="1" max="5" />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;