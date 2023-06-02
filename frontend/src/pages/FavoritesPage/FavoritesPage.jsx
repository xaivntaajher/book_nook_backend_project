import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookDetailPage/BookCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/user_favorites"
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <div>
          {favorites.map((favorite) => (
            <BookCard key={favorite.id} book={favorite} />
          ))}
        </div>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;