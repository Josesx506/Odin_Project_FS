"use client";

import useProducts from "@/hooks/useProducts";
import PaginationComponent from "./PaginationComponent";

export default function ProductCategories({ name, page }) {
  const mainCategories = {
    "accessories": ["sports-accessories","sunglasses"],
    "beauty": ["beauty","fragrances",,"skin-care"],
    "electronics": ["smartphones","tablets","laptops","mobile-accessories"],
    "men": ["mens-shirts","mens-shoes","mens-watches"],
    "watches": ["mens-watches","womens-watches"],
    "women": ["tops","womens-bags","womens-dresses","womens-jewellery","womens-shoes","womens-watches"],
  }

  const { products } = useProducts();

  let category;
  if (mainCategories.hasOwnProperty(name)) {
    category = products.filter(product => mainCategories[name].includes(product.category))
  } else {
    category = products;
  }

  return (
    <div>
      <PaginationComponent page={page} data={category} />
    </div>
  )
}
