import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import BookCard from "../BookDetailPage/BookCard";

const FavoritesPage = () => {
  const [user, token] = useAuth();
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let response = await axios.get("http://localhost:5000/api/user_favorites", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setBooks(response.data)
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchBooks();

  }, [token]);


  const bookCards = books.map((book) => <BookCard key={book.id} book={book} />)



  return (
    <div className="container">

      <div>{bookCards}</div>

    </div>
  );
};

export default FavoritesPage;