import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const [user, token] = useAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        let response = await axios.get("http://localhost:5000/api/user_favorites", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchFavorites();
  }, [token]);

  return (
    <div className="container">
      <h1>{user.username}'s Favorites!</h1>
      <h2>
        <Link to="/add_favorite" className="add-favorite-link">
          Add a new Favorite? Clike Here.
        </Link>
      </h2>
      <div>
        {books.map((book) => (
          <Link className="favorite-card" key={book.id} to={`/book/${book.book_id}`}>
      
              <p className="favorite-title">{book.title}</p>
              <p className="favorite-url">{book.thumbnail_url}</p>
       
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;