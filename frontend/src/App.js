// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddCarPage from "./pages/AddCarPage/AddCarPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import BookDetailPage from "./pages/BookDetailPage/BookDetailPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";


// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import AddFavorite from "./pages/FavoritesPage/AddFavorite";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddCarPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={      
              <SearchPage />
          }
        />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book/:book_id" element={<BookDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage/>}/>
        <Route path="/add_favorite" element={<AddFavorite/>}/>




      </Routes>
      <Footer />
    </div>
  );
}

export default App;