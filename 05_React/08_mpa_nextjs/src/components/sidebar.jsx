"use client";

import Form from "next/form";
import Link from "next/link";
import "../styles/sidebar.css";
import { useContacts } from "@/contexts/ContactsContext";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";


export function filterItems(items, query) {
  query = query.toLowerCase();
  return items.filter(item =>
    (item.firstName.toLowerCase().startsWith(query))
  );
}


export default function SideBar({ children }) {
  const { contacts, setContacts } = useContacts();
  const [query, setQuery] = useState("");
  const filtContacts = filterItems(contacts, query);
  const router = useRouter();
  let searching = useRef(null);

  function handleChange(e) {
    e.preventDefault();
    setQuery(e.target.value);
    e.target.value == "" ? searching.current = false : searching.current = true;
    router.push("/contacts/")
  }
  
  return (
    <div className="container mainSection">
      <div id="sidebar">
        <h2>NextJS Router</h2>
        <div className="sidebarForms">
            <Form id="searchForm" role="search" onSubmit={(e)=>e.preventDefault()}>
              <input id="q" placeholder="Search?" onChange={handleChange}/>
              <div id="search-spinner" aria-hidden hidden={!searching.current} />
              <div className="sr-only" aria-live="polite"></div>
            </Form>
            <Form action="/cart">
              <button id="createContact" type="submit">+New</button>
            </Form>
        </div>
        <div className="sideBarContacts" onScroll={(e)=>e.preventDefault()}>
            {filtContacts.length>0 ? filtContacts.map(contact => {
                return (
                <div className="contactSummary" key={contact.id}>
                    <Link href={"/contacts/"+contact.id}>
                        {contact.firstName + " " + contact.lastName}
                    </Link>
                </div>
                )
            }) 
            : <div className="contactSummary">
                No results found.
              </div>}
        </div>
      </div>
      <div id="bodySection">
        {children}
      </div>
    </div>
  )
}
