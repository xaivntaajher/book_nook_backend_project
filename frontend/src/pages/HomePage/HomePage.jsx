import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]); 
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

  console.log(books)


  useEffect(() => {
    const fetchCars = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/user_cars", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchCars();

  }, [token]);

  console.log(cars)

  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      <Link to="/add">
        <p>click to add new car</p>
      </Link>
      <Link to="/search">
        <p>click to search</p>
      </Link>

      {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))}

      {books &&
        books.map((book) => (
          <p key={book.id}>
            {book.title}
          </p>
        ))}

      </div>
  );
};

export default HomePage;