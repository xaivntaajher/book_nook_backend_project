import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";



const BookDetailPage = ({}) => {
  const {book_id} = useParams();
  const [book, setBook] = useState(null)

  const fetchBook = async() => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user_favorites/${book_id}`)
      setBook(response.data)

    } catch (error) {

    }
  }

useEffect(() =>{fetchBook()}, [book_id])

  return (
    <div>
      <h1>{book_id}</h1>
      <h2></h2>

    </div>
  );
};


export default BookDetailPage;