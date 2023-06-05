import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

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
      <div>{user.username}'s Favorites!</div>
      <div>
        {books.map((book) => (
          <Link key={book.id} to={`/book/${book.book_id}`}>
            <div>

              <p>{book.title}</p>
              <p>{book.thumbnail_url}</p>

            </div>
          </Link>
        ))}
      </div>

      <div>  <Link to="/add_favorite">
        <p>Add a new Favorite</p>
      </Link></div>


    </div>
  );
};

export default FavoritesPage;