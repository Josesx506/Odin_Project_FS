import { Star } from "lucide-react";

export default function StarRating ({ rating }) {
  const roundedRating = Math.round(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star key={i} style={{color: "black"}} className={i < roundedRating ? "yellowStar" : "emptyStar"} />
    );
  }

  return (
    <div style={{display:"flex", alignItems:"center"}} >
      {stars}
      <span className="ratingVal">&nbsp;({rating.toFixed(1)})</span>
    </div>
  );
};