"use client";

import localforage from "localforage";

function cacheProducts(products) {
  return localforage.setItem("products", products);
}


export function cacheCart(items) {
  return localforage.setItem("cart", items);
}

export async function getProducts() { 
  let products = await localforage.getItem("products");

  if (products) {
    return ( products );
  } else {
    const res = await fetch("https://dummyjson.com/products?limit=194&sortBy=id&order=asc");
    const data = await res.json();

    const shopCategories = ["beauty","fragrances","mens-shirts","mens-shoes","mens-watches","skin-care",
        "smartphones","tablets","laptops","mobile-accessories","sports-accessories","sunglasses","tops",
        "womens-bags","womens-dresses","womens-jewellery","womens-shoes","womens-watches"];
    
    const shopItems = data.products.filter(product => (shopCategories.includes(product.category)));
    cacheProducts(shopItems);
    
    return shopItems;
  }
}


export async function getCartItems() { 
  let cart = await localforage.getItem("cart");
  
  if (cart) {
    return (cart);
  } else {
    let emptyCart = [];
    cacheCart(emptyCart);

    return emptyCart;
  }
}