import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/book/${book.id}`)
  }

  console.log(book)

  return    <div className='book-card' onClick={handleClick}>
    <div>{book.title}</div>
    <div>{book.thumbnail_url}</div>
</div>
};

export default BookCard;