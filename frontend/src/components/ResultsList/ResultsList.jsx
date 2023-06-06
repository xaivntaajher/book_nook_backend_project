import React from 'react';
import { Link } from 'react-router-dom';
import './ResultsList.css'




const ResultsList = ({searchResults}) => {

    return ( 
        <div>
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <Link
              to={{
                pathname: `/book/${item.id}`,
                state: { book: item.volumeInfo }
              }}
              key={item.id}
            >
              <span className='results-card'>
                <h3>{item.volumeInfo.title}</h3>
                {item.volumeInfo.imageLinks && (
                  <img
                    src={item.volumeInfo.imageLinks.thumbnail}
                    alt={item.volumeInfo.title}
                  />
                )}
              </span>
            </Link>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
     );
}
 
export default ResultsList;