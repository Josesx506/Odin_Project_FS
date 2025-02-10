import Image from "next/image";
import { DiscountCarousel, RatingCarousel } from '@/components/metricCarousels';

export default function Home() {
  return (
    <div>
      <div style={{position:"relative", maxWidth:"90vw", height:"60vh"}}>
        <Image src={"https://images.pexels.com/photos/7256350/pexels-photo-7256350.jpeg?auto=compress&cs=tinysrgb&w=1500"} 
         quality={90} style={{objectFit:"cover"}} fill alt="background fashion picture" />
      </div>
      <div className="pageSection">
        <h3>Top Rated Items</h3>
        <RatingCarousel />
      </div>
      <div className="pageSection">
        <h3>Best Discounts</h3>
        <DiscountCarousel />
      </div>
    </div>
  )
}