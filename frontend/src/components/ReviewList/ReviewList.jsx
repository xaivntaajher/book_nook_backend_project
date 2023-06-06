import React from 'react';

const ReviewList = ({reviews, book, handleReview, user}) => {
    return ( 
        <div className='container-2'>

          

          {reviews.length > 0 ? (
            <div>
              <h3>Reviews</h3>
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
        <div className='add-review'>
          <h3 className='add-review-title'>Add a Review</h3>
          <form onSubmit={handleReview}>
            <textarea
              rows="4"
              cols="50"
              placeholder="Enter your review..."
            ></textarea>
            <input className='rating' type="number" placeholder="Rating" min="1" max="5" style={{ height: '15px', width: '65px' }} />
          </form>
            <button type="submit">Submit Review</button>
        </div>
      )}

    </div>
     );
}
 
export default ReviewList;