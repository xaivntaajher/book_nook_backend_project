import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const BookDetailPage = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [user, token] = useAuth();

  const fetchBook = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user_favorites/${book_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setBook(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [book_id, token]);

  return (
    book &&
    <div>
      <h1>{book_id}</h1>
    
      <h2>{book.title}</h2>
      <h2>{book.thumbnail_url}</h2>


    </div>
  );
};

export default BookDetailPage;