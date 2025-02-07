"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars,faXmark,faCartShopping } from "@fortawesome/free-solid-svg-icons"
import "../styles/nav.css"

export default function Navbar() {
  const menuRef = useRef("navItems");
  const [toggle,setToggle] = useState(false);

  function toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    menuRef.current = menuRef.current == "navItems" ? "navItemsVisible" : "navItems";
    setToggle(!toggle);
  }

  function closeMenu() {
    menuRef.current = "navItems";
    setToggle(false);
  }
  
  const openIcon = <FontAwesomeIcon icon={faBars} className="hamburger" />;
  const closeIcon = <FontAwesomeIcon icon={faXmark} className="hamburger" />;
  const cartIcon = <FontAwesomeIcon icon={faCartShopping} />

  return (
    <div className="container">
      <div className="nav">
        <button className={"navToggle"} onClick={toggleMenu}>{!toggle ? openIcon : closeIcon}</button>
        <div className={menuRef.current}>
          <div className="navList left">
            <Link className="navItem" href="/contacts" onClick={closeMenu}>Contacts</Link>
            <Link className="navItem" href="/shop" onClick={closeMenu}>Shop</Link>
          </div>
          <div className="navList center">
            <Link className="navItem" href="/" onClick={closeMenu}><h3>NavHome</h3></Link>
          </div>
          <div className="navList right">
            <Link className="navItem" href="/signin" onClick={closeMenu}>Sign In</Link>
            <Link className="navItem" href="/signup" onClick={closeMenu}>Sign Up</Link>
            <Link className="navItem cart" href="/cart" onClick={closeMenu}>{cartIcon}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
