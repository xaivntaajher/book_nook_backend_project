import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]); 

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="container">
      <div>Hello, {user.username}!</div>
      <div>Cars List:</div>
      <div>
        {cars.map((car) => (
          <div key={car.id}>
            <p>{car.make}</p>
            <p>{car.model}</p>
          </div>
        ))}
      </div>
      <div>
        <Link to="/favorites">
          <p>Go to Favorites</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;