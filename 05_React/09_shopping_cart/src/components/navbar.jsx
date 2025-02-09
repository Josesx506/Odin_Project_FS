"use client"

import Image from "next/image"
import Link from "next/link"
import "../styles/navbar.css"
import { useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import useCart from "@/hooks/useCart"

export default function NavBar() {
  const navRef = useRef("navList");
  const toggleRef = useRef("navToggler");
  const [toggle, setToggle] = useState(false);
  const { cartQuantity } = useCart();

  const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    navRef.current = navRef.current == "navList" ? "navList--visible" : "navList";
    toggleRef.current = toggleRef.current == "navToggler" ? "navToggler is-active" : "navToggler";
    setToggle((prev) => !prev);
  }

  function closeMenu() {
    navRef.current = "navList";
    toggleRef.current = "navToggler";
    setToggle(false);
  }

  return (
    <div className="navHolder">
      <div className="navLogo">
        <Link className="navItem" onClick={closeMenu} href="https://josesx506.github.io/Odin_Project_FS/">
          <Image
            src="/store.svg"
            alt="Store Icon"
            width={80} height={40}
            priority
            style={{margin:0, padding:0}}
          />
          <div style={{justifySelf: "center"}}>Odin</div>
        </Link>
      </div>
      <div onClick={handleClick} id="hamburger" className={toggleRef.current}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      <nav className={navRef.current}>
        <div className="navList--internal">
          <Link className="navItem" onClick={closeMenu} href="/">Home</Link>
          <Link className="navItem" onClick={closeMenu} href="/shop">Shop</Link>
          <Link className="navItem" onClick={closeMenu} href="/about">About</Link>
        </div>
        <Link className="navItem cart" onClick={closeMenu} href="/cart">
          {cartIcon}
          <span>{cartQuantity()}</span>
        </Link>
      </nav>
    </div>
  )
}
