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

    return (
        <ProductsContext.Provider value={{ products }}>
          {children}
        </ProductsContext.Provider>
      );
}