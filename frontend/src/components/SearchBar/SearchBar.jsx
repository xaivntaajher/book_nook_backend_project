import React from 'react';

const SearchBar = ({searchTerm, setSearchTerm, handleSearch}) => {
    return ( 
        <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
     );
}
 
export default SearchBar;