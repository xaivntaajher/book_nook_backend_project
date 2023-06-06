import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const { id, title, thumbnail_url } = book;

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`}>
        <div>{book.title}</div>
        <div>{book.thumbnail_url}</div>
      </Link>
    </div>
  );
};

export default BookCard;
