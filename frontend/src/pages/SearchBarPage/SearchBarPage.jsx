import React, { useState } from 'react';


function SearchBarPage({ onSearch}) {
    const [term, setTerm] = useState('');
  
    function handleSubmit(event) {
      event.preventDefault();
      onSearch(term);
    }

    return (
        <form onSubmit={handleSubmit} className='search-bar-section'>
          <h3>Search Bar</h3>
          <input
            type="text"
            placeholder="Search..."
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            className='search-bar'
          />
          <div className='search-bar-buttons'>
          <button type="submit">Search</button>
          </div>
        </form>
      );
    }
    
    export default SearchBarPage;