import Image from "next/image";
import Link from "next/link";
import "../styles/thumbnail.css";

import useCart from "@/hooks/useCart";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { formatCurrency } from "@/utils/currency";


export default function Thumbnail({ product }) {
  const plusIcon = <FontAwesomeIcon icon={faPlus} />;
  const minusIcon = <FontAwesomeIcon icon={faMinus} />;
  const { 
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity
  } = useCart();

  return (
    <div className="productThumbnail">
      <Link className="productLink" href={`/${product.id}`}>
        <div className="productImg">
            <Image src={product.thumbnail} priority={true} 
              width={200} height={200}
              style={{maxWidth:"100%", objectFit:"cover"}}
              alt={`DummyJSON product id: ${product.id}`}
            />
            <div className="productPrice">
              {formatCurrency(product.price)}
            </div>
        </div>
        <div className="productTitle">
            {product.title}
        </div>
      </Link>
      <div className="productCart">
        <button onClick={()=>decreaseCartQuantity(product.id)}>{minusIcon}</button>
        <div>{getItemQuantity(product.id)}</div>
        <button onClick={()=>increaseCartQuantity(product.id, product.price)}>{plusIcon}</button>
      </div>
    </div>
  )
}
