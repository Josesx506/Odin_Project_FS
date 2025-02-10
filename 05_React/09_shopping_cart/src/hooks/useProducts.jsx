import { ProductsContext } from "@/context/ProductsContext";
import { useContext } from "react";

export default function useProducts() {
  const context =  useContext(ProductsContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
