"use client"

import useCart from "@/hooks/useCart"
import useProducts from "@/hooks/useProducts"
import { formatCurrency } from "@/utils/currency"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import "../styles/cartCard.css"

export default function CartDetails() {
  const { products } = useProducts();
  const { cartItems, 
    increaseCartQuantity, 
    decreaseCartQuantity,
    removeFromCart,
    calculateTotal } = useCart();
  
  const plusIcon = <FontAwesomeIcon icon={faPlus} />;
  const minusIcon = <FontAwesomeIcon icon={faMinus} />;
  
  return (
    <div className="cartPage">
      {cartItems.length === 0 ? 
        <div className="emptyCart">
          <div>Your cart is Empty</div>
          <Link href="/shop/all">Shop Now</Link>
        </div> :
        <div>
          <h1>Thank you for shopping with us</h1>
          <div className="cartBody">
            {cartItems.map((item)=> {
              let product = products.find(prd => prd.id === item.id);
              return (
                <div key={item.id} className="cartCard">
                  <div className="cartCardThumbnail">
                    <Image src={product.thumbnail} width={60} height={60} 
                      alt={`cart item id ${item.id}`} />
                  </div>
                  <div className="cartCardDetails">
                    <div className="cartCardTitle">
                      <Link href={`/${item.id}`}>{product.title}</Link>
                    </div>
                    <div className="cartCardUpdate">
                      <button onClick={()=>decreaseCartQuantity(item.id)}>{minusIcon}</button>
                      <div>Qty: &nbsp; {item.quantity}</div>
                      <button onClick={()=>increaseCartQuantity(item.id, item.price)}>{plusIcon}</button>
                    </div>
                    <div className="cartCardLowerDetails">
                      <div className="cartCardVolume">
                        Price: {formatCurrency(item.price)}
                      </div>
                      <button onClick={()=>removeFromCart(item.id)} className="delCartItem">
                        <X strokeWidth="3px" color="red" size="2rem" />
                      </button>
                    </div>
                  </div>
                </div>
              )})
            }
          </div>
          <div className="cartTotal">
            <div>Total: &nbsp;</div>
            <div>{formatCurrency(calculateTotal())}</div>
          </div>
          <h2 style={{textAlign:"center", color:"#0070f3"}}>Checkout is coming soon</h2>
        </div>}
    </div>
  )
}

