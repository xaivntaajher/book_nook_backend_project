import React from 'react';
import { Link } from 'react-router-dom';

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
              <div>
                <h3>{item.volumeInfo.title}</h3>
                {item.volumeInfo.imageLinks && (
                  <img
                    src={item.volumeInfo.imageLinks.thumbnail}
                    alt={item.volumeInfo.title}
                  />
                )}
              </div>
            </Link>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
     );
}
 
export default ResultsList;