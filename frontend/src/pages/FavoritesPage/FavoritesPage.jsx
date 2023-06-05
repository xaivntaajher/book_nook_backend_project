import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import BookCard from "../BookDetailPage/BookCard";
import { Link } from "react-router-dom";



const FavoritesPage = () => {
  const [user, token] = useAuth();
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchFavorites = async () => {
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
    fetchFavorites();

  }, [token]);


  const bookCards = books.map((book) => (
    <Link key={book.id} to={`/book/${book.book_id}`}>
      <BookCard book={book} />
    </Link>
));


  return (
    <div className="container">
      <div>{user.username}'s Favorites!</div>
      <div>{bookCards}</div>

    </div>
  );
};

export default FavoritesPage;