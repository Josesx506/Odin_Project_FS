"use client"

import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import { formatCurrency } from "@/utils/currency";
import Error from "next/error";
import Image from "next/image";
import { useRef } from "react";
import "../styles/details.css";
import ReviewDetails from "./ReviewDetails";

import StarRating from "./starRating";

export default function ProductDetails({ id }) {
  const { products } = useProducts();
  const product = products.find(prod => prod.id === id);
  const { bulkInsertCart} = useCart();
  const purchaseQty = useRef();

  function handleInsert(e,id,price) {
    e.preventDefault();
    let qty = parseInt(purchaseQty.current.value);
    bulkInsertCart(id,qty,price);
    purchaseQty.current.value = "";
  }

  return (
    <div>
      {product ?
      <div className="productDetailCntr">
        <div className="productDetail">
          <div className="productImage">
            <img src={product.images[0]} alt={`product ${product.id} large image`} />
          </div>
          <div className="productDesc">
            <h2>{product.title}</h2>
            <div className="descText">{product.description}</div>
            <div className="descPrice">
              <span>Price: </span>
              (<span className="priceLineThrough">{formatCurrency(product.price*(1+(product.discountPercentage/100)))}</span>)
              <span>&nbsp;&nbsp;{formatCurrency(product.price)}</span>
            </div>
            <div className="descRating">
              <span>Rating: &nbsp;</span><StarRating rating={product.rating} />
            </div>
            <div className="descDimensions">
              <div style={{fontWeight:"bold"}}>Dimensions</div>
              <ul>
                <li>Width: {product.dimensions.width}"</li>
                <li>Height: {product.dimensions.height}"</li>
                <li>Depth: {product.dimensions.depth}"</li>
                <li>Weight: {product.weight} g</li>
              </ul>
            </div>
            <div className="detailsProductCart">
              <form onSubmit={(e)=> handleInsert(e,product.id,product.price)}>
                <input ref={purchaseQty} min="1" max={`${product.stock}`} required placeholder=""
                  style={{width:"3rem", textAlign:"center"}} type="number"
                  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} />
                <button type="submit">Add to Cart</button>
              </form>
            </div>
          </div>
        </div>
        <div className="productReviews">
          <ReviewDetails reviews={product.reviews} />
        </div>
      </div>
      : <Error statusCode={404} title={`Product id:${id} found`} />
      }
    </div>
  )
}
