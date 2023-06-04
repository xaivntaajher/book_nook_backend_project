import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const BookDetailPage = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [user, token] = useAuth();
  const { review_id } = useParams();

  const fetchBook = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/book_information/${book_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data) {
        setBook(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [book_id, token]);

  return (
    book && (
      <div>
        {book.reviews.map((review) => (
          <div key={review.id}>
            <p>{review.text}</p>
            <p>{review.rating}</p>
          </div>
        ))}

        <p>Average Rating: {book.average_rating}</p>

        {book.is_favorited ? (
          <div>
            <p>Title: {book.title}</p>
            <p>URL: {book.url}</p>
          </div>
        ) : (
          <p>Book is not favorited</p>
        )}
      </div>
    )
  );
};

export default BookDetailPage;