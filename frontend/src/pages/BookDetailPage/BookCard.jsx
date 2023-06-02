import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/book/${book.id}`)
  }


  return    <div className='book-card' onClick={handleClick}>
    {book.title}
</div>
};

export default BookCard;
