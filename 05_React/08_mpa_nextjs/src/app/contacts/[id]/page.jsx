

import React from 'react'
import ClientContact from '@/components/clientContact'

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/users?limit=50&sortBy=firstName&order=asc");
  const data = await res.json();
  const contacts = data.users;

  return contacts.map(contact => ({
    id: contact.id.toString()
  }))
}

export default async function Page({params}) {
  const { id } = await params;
  return ( <ClientContact id={id} />)
}