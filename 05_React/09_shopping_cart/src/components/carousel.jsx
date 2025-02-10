"use client"

import { formatCurrency } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import "../styles/carousel.css";

export default function Carousel({products, metric}) {
  const [scroll, setScroll] = useState(0);
  const [itemWidth, padding] = [80, 10];
  const totalWidth = itemWidth + padding;
  const indexRef = useRef(0);
  const containerRef = useRef();

  function handleScroll(scrollAmount) {
    const newScroll = scroll+scrollAmount
    setScroll(newScroll);
    containerRef.current.scrollLeft = newScroll;
  }
  function prevClick(e) {
    e.preventDefault();
    if (indexRef.current > 0) {
        handleScroll(-totalWidth);
        indexRef.current = indexRef.current - 1;
    }
  }
  function nextClick(e) {
    e.preventDefault();
    if (indexRef.current < products.length - 1) {
        handleScroll(totalWidth);
        indexRef.current = indexRef.current + 1;
    }
  }

  return (
    <div className="carouselHolder">
      <div className="carouselView">
        <button className="prevBtn" 
          onClick={prevClick}
          disabled={indexRef.current === 0} 
          >
            &#10094;
        </button>
        <div ref={containerRef} className="itemList">
          {products.map((product, index) => {
            return (
                <Link href={`/${product.id}`} key={product.id} className="item">
                <Image src={product.thumbnail} priority={true} 
                width={80} height={80} alt={product.title} />
                {metric === "discountPercentage" && 
                <div className="carouselDiscount">
                    {parseFloat(product[metric]).toFixed(0)+"%"}
                </div>
                }
                {metric === "rating" && 
                <div className="carouselRating">
                    {parseFloat(product[metric]).toFixed(2)}
                </div>
                }
                <div className="carouselPrice">
                    {formatCurrency(product.price)}
                </div>
                </Link>
            )
          })}
        </div>
        <button className="nextBtn" 
          disabled={indexRef.current === products.length - 1}
          onClick={nextClick}
          >
            &#10095;
        </button>
      </div>
    </div>
  )
}