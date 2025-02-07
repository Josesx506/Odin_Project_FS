"use client";

import { createContext, useContext, useEffect, useState } from "react";
import LoadDummyData from "@/utils/loadDummyData";
const ContactsContext = createContext(null);

export function useContacts() {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
}

export default function ContactsProvider({ children }) {
    const [contacts, setContacts] = useState([]);
    
    useEffect(() => {
      const controller = new AbortController();

      let data = LoadDummyData(controller.signal);
      data.then(output => {
        setContacts(output);
      })
      
        return () => controller.abort();
    }, []);
  
    return (
      <ContactsContext.Provider value={
        { contacts, setContacts }
        }>
        {children}
      </ContactsContext.Provider>
    );
}
