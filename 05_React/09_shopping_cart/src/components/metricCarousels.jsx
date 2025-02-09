"use client"

import Carousel from "@/components/carousel";
import useProducts from "@/hooks/useProducts";


export function DiscountCarousel() {
  const { topDiscounts } = useProducts();
  const products = topDiscounts();

  return (
    <div>
      <Carousel products={products} metric={"discountPercentage"} />
    </div>
  )
}

export function RatingCarousel() {
  const { topRatings } = useProducts();
  const products = topRatings();

  return (
    <div>
      <Carousel products={products} metric={"rating"} />
    </div>
  )
}