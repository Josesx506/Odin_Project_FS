import localforage from "localforage";
import sortBy from "sort-by";

export default async function LoadDummyData(signal) {
  const res = await fetch("https://dummyjson.com/users?limit=50&sortBy=firstName&order=asc",
    {signal:signal}
  );
  const data = await res.json();
  let contactData = data.users;
  if (contactData) {
    contactData.sort(sortBy("firstName", "lastName"))
  };
  localforage.setItem("contacts", contactData);
  console.log("Loading data for the first time");
  return (contactData);
}

export async function getContacts() {
  let contacts = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  return contacts.sort(sortBy("firstName", "lastName"));
}

export function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

export async function createContact(newContact) {
  let contact = { ...newContact, createdAt: Date.now() };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contacts.sort(sortBy("firstName", "lastName"));
}