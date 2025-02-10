import React from "react"
import StarRating from "./starRating"

export default function ReviewDetails({reviews}) {
  return (
    <div>
      <h2 style={{textAlign:"center"}}>Product Reviews</h2>
      {reviews.length==0 ? <div>No reviews available for this product yet</div> :
      <div>{reviews.map((review, index) => {
        return (
            <div key={index} className="reviewCard">
              <div className="reviewRow">
                <div className="reviewName">{review.reviewerName}</div>
                <StarRating rating={review.rating} />
              </div>
              <div className="reviewComment">{review.comment}</div>
              <div className="reviewDate">{review.date.split(".")[0]}</div>
            </div>
        )
      })}</div>
      }
    </div>
  )
}
