import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const BookDetailPage = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [user, token] = useAuth();
  const {review_id} = useParams();

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
      setBook(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [book_id, token]);


console.log(book_id)

  return (
    book &&
    <div>

      <div>{book_id}</div>
      <div>{book.title}</div>
      <div>{book.url}</div>
      <div>{book.reviews}</div>
      <div>{book.average_rating}</div>
      
      

   
    </div>
  );
};

export default BookDetailPage;