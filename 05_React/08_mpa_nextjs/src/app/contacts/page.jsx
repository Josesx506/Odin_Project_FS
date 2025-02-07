"use client"

import React from 'react'
import { useContacts } from '@/contexts/ContactsContext'

export default function Page() {
  const {contacts} = useContacts();
  
  return (
    <div>
      <h1 style={{marginBottom:"1em"}}>Contact Page</h1>
      <h3>There are currently {contacts.length} contacts in your directory</h3>
      <div style={{paddingTop:"1em"}}>Click <code>Search?</code> to find someone specific.</div>
      <div style={{paddingTop:"1em"}}>Click on the search results to view contact details.</div>
      <div style={{paddingTop:"1em"}}>Click on the <code>+New</code> to create new contacts.</div>
      <div style={{paddingTop:"1em"}}>Update and delete operations are not supported.</div>
    </div>
  )
}
