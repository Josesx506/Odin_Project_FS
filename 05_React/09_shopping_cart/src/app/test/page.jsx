"use client"

import Carousel from '@/components/carousel';
import useProducts from '@/hooks/useProducts';

export default function Page() {
  const { topRatings } = useProducts();
  const products = topRatings();
  console.log(products);

  return (
    <div>
      <div>This</div>
      <Carousel products={products} metric={"rating"} />
    </div>
  )
}


// export function DiscountCarousel() {
//   const { topDiscounts } = useProducts();
//   const products = topDiscounts();

//   return (
//     <div>
//       <Carousel products={products} metric={"discountPercentage"} />
//     </div>
//   )
// }

// export function RatingCarousel() {
//   const { topRatings } = useProducts();
//   const products = topRatings();

//   return (
//     <div>
//       <Carousel products={products} metric={"rating"} />
//     </div>
//   )
// }