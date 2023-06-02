import React from 'react';

const BookCard = ({ title, author, coverImage, description }) => {
  return (
    <div className="book-card">
      <img src={coverImage} alt={title} className="book-card__image" />
      <div className="book-card__info">
        <h2 className="book-card__title">{title}</h2>
        <p className="book-card__author">{author}</p>
        <p className="book-card__description">{description}</p>
      </div>
    </div>
  );
};

export default BookCard;
