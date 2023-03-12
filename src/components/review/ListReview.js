import React from 'react'

const ListReview = ({reviews}) => {
  return (
    <div className="reviews w-75 ml-5">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map(review => (
                <div key={review._id} className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                    </div>
                    <p className="review_user mb-2" style={{fontSize:'12px', color:'blue'}}>by {review.name}</p>
                    <p className="review_comment" style={{color:'black',fontWeight:'500'}}>{review.comment}</p>

                    <hr />
                </div>
            ))}
        </div>
  )
}

export default ListReview
