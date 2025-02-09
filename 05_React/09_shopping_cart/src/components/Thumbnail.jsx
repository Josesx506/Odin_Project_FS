import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import "../styles/thumbnail.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import useCart from '@/hooks/useCart';


export default function Thumbnail({ product }) {
  const plusIcon = <FontAwesomeIcon icon={faPlus} />;
  const minusIcon = <FontAwesomeIcon icon={faMinus} />;
  const { 
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity
  } = useCart();

  if (!increaseCartQuantity) {
    console.error("increaseCartQuantity is undefined!");
  }


  return (
    <div className="productThumbnail">
      <Link className="productLink" href={`/shop/${product.id}`}>
        <div className="productImg">
            <Image src={product.thumbnail} priority={true} 
              width={200} height={200}
              style={{maxWidth:"100%", objectFit:"cover"}}
              alt={`DummyJSON product id: ${product.id}`}
            />
        </div>
        <div className="productTitle">
            {product.title}
        </div>
      </Link>
      <div className="productCart">
        <button onClick={()=>decreaseCartQuantity(product.id)}>{minusIcon}</button>
        <div>{getItemQuantity(product.id)}</div>
        <button onClick={()=>increaseCartQuantity(product.id)}>{plusIcon}</button>
      </div>
    </div>
  )
}
