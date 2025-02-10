"use client";

import { getCartItems, cacheCart } from "@/components/pullJSON";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = getCartItems();
    data.then((resp) => setCartItems(resp));
  }, [])
  
  function getItemQuantity(id) {
    let quantity = cartItems.find(item => item.id === id)?.quantity || 0
    return quantity;
  }

  function increaseCartQuantity(id, price) {
    // loop through the items in the cart
    setCartItems(currItems => {
        const updatedCart = currItems.find(item => item.id === id) ?
                            currItems.map((item) =>
                                // Increment existing cart item && Pass unedited items
                                item.id === id ? { ...item, quantity: item.quantity + 1 } : item) : 
                                [...currItems, { id, quantity:1, price:price}]// Create a new cart item
        
        cacheCart(updatedCart); // Update the cache
        return updatedCart;
    });
  }

  function bulkInsertCart(id, quantity, price) {
    // loop through the items in the cart
    setCartItems(currItems => {
        const updatedCart = currItems.find(item => item.id === id) ?
                            currItems.map((item) =>
                                // Increment existing cart item && Pass unedited items
                                item.id === id ? { ...item, quantity: item.quantity + quantity } : item) : 
                                [...currItems, { id, quantity, price}]// Create a new cart item with multivalues
        
        cacheCart(updatedCart); // Update the cache
        return updatedCart;
    });
  }

  function decreaseCartQuantity(id) {
    setCartItems(currItems => {
        const updatedCart = currItems.find(item => item.id === id)?.quantity === 1 ?
                            currItems.filter(item => item.id !== id) :                        // Remove items with only one product left
                            currItems.map((item) =>
                                    item.id === id ? {...item, quantity: item.quantity - 1} : // Decrement existing cart item
                                    item)                                                     // Pass unedited items
        cacheCart(updatedCart); // Update the cache
        return updatedCart;
    });
  }

  function removeFromCart(id) {
    setCartItems(currItems => {
        return currItems.filter(item => item.id !== id)
    })
  }

  // Loop through each item in the cart and sum their quantities starting from zero
  function cartQuantity() {
    const totalItems = cartItems.reduce((quantity, item) => (item.quantity + quantity), 0);
    return totalItems;
  }

  function calculateTotal() {
    const cartValue = cartItems.reduce((total,item) => {
      return total + (item.price * item.quantity)
    }, 0)
    return cartValue;
  }
  
  return (
    <CartContext.Provider value={{
      cartItems,
      getItemQuantity,
      increaseCartQuantity,
      bulkInsertCart,
      decreaseCartQuantity,
      removeFromCart,
      cartQuantity,
      calculateTotal,
    }}>
      {children}
    </CartContext.Provider>
  )
}
