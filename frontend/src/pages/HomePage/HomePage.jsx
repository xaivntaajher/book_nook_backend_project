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
      <h1>Welcome back,  {user.username} </h1>

      <Link to="/search">
        <p>Click To Search for Books</p>
      </Link>
      <Link to="/favorites">
        <p>Go To Favorites Page</p>
      </Link>


  
    </div>
  );
};

export default HomePage;