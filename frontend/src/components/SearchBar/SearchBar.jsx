import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <form className="search-bar-form" onSubmit={handleSearch}>
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button className="search-bar-button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;