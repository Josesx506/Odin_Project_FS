"use client";

import localforage from "localforage";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from 'next/navigation';
// import { useContacts } from "@/contexts/ContactsContext";
import "../../../styles/contact.css"
import Image from "next/image";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id;
  const query = searchParams.q;
  const [contact, setContact] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;
      const contacts = await localforage.getItem("contacts");
      const tmp = contacts?.find((contact) => contact.id.toString() === id);
      setContact(tmp || {});
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);


  if (contact === null) {
    return (
    <div className="loaderCntr">
      <div className="loader"></div>
    </div>);
  }

  if (Object.keys(contact).length === 0 && id !== null) {
    return <div>Contact not found.</div>;
  }

  function createImage(id) {
    // contact.image - original img source
    // `https://robohash.org/${contact.id}.png?size=200x200`
    if (typeof(id)==="number") {
      console.log(id);
      if (invlImgIds.includes(id)) {
        return `https://picsum.photos/id/${id+1}/150/150`
      } else {
        return `https://picsum.photos/id/${id}/150/150`
      }
    } else {
      return `https://robohash.org/1.png?size=150x150`
    }
  }

  const invlImgIds = [205];

  return (
    <div id="contact">
      <div>
        <Image key={contact.id}
          className="contactImg"
          src={createImage(contact.id)}
          width={150} height={150}
          alt="Contact Image" priority={true}
          onError={(e) => e.target.src = `https://robohash.org/${contact.id}.png?size=200x200`}
        />
      </div>
      <div className="contactName">
        <h2>
          {contact.firstName || contact.lastName ? (
            <>
              {contact.firstName} {contact.lastName}
            </>
          ) : (
            <i>No Name</i>
          )}
        </h2>
        <h3>Gender: {capitalize(contact.gender)}</h3>
      </div>
      <div className="contactRow">
        <div className="contactInfo">
          <div><b>Email</b>: {contact.email}</div>
          <div><b>Phone</b>: {contact.phone}</div>
        </div>
        <div className="contactPhysicals">
          <div><b>Height</b>: {contact.height} cm</div>
          <div><b>Weight</b>: {contact.weight} kg</div>
        </div>
      </div>
    </div>
  );
}