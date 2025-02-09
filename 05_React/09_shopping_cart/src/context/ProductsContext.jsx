"use client";

import { getProducts } from "@/components/pullJSON";
import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext(null);

export default function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);

    // UseEffect is required to force the component to only retrieve data on load
    useEffect(() => {
      const data = getProducts()
      data.then((resp) => setProducts(resp));
    }, [])

    function topDiscounts () {
      // Sort by discount and return top 10
      const discounted = products.sort((a, b) => b.discountPercentage - a.discountPercentage)
      return discounted.slice(0,10);
    }

    function topRatings () {
      // Sort by rating and return top 10
      const rating = products.sort((a, b) => b.rating - a.rating)
      return rating.slice(0,10);
    }

    return (
        <ProductsContext.Provider value={{
          products,
          topDiscounts,
          topRatings
        }}>
          {children}
        </ProductsContext.Provider>
      );
}