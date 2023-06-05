import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const { id, title, thumbnail_url } = book;

  return (
    <div className="book-card">
      <Link to={`/book/${id}`}>
        <div>{title}</div>
        <img src={thumbnail_url} alt={title} />
      </Link>
    </div>
  );
};

export default BookCard;
