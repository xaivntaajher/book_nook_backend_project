import React from 'react';

const ReviewList = ({reviews, book, handleReview, user}) => {
    return ( 
        <div>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <div key={review.id}>
              <p>{review.text}</p>
              <p>{review.rating}</p>
            </div>
          ))}
          <p>Average Rating: {book?.average_rating}</p>
        </div>
      ) : (
        <p>No reviews found for this book.</p>
      )}

      {user && (
        <div>
          <h3>Add a Review</h3>
          <form onSubmit={handleReview}>
            <textarea
              rows="4"
              cols="50"
              placeholder="Enter your review..."
            ></textarea>
            <input type="number" placeholder="Rating" min="1" max="5" />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}

    </div>
     );
}
 
export default ReviewList;