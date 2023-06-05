// SearchPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import ResultsList from '../../components/ResultsList/ResultsList';
import SearchBar from '../../components/SearchBar/SearchBar';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );
      setSearchResults(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Search Page</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch}/>
      <ResultsList searchResults={searchResults}/>
    </div>
  );
}

export default SearchPage;