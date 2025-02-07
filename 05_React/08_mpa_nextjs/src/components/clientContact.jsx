"use client";

import localforage from "localforage";
import Image from "next/image";
import { useEffect, useState } from "react";
import "../styles/contact.css";

function capitalize(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "Unknown";
}

export default function ClientContact({ id }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const contacts = await localforage.getItem("contacts");
      const tmp = contacts?.find((c) => c.id.toString() === id);
      if (isMounted) setContact(tmp || {});
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
      </div>
    );
  }

  if (!contact.id) {
    return <div>Contact not found.</div>;
  }

  function createImage(contactId) {
    const invalidImgIds = [205];

    if (typeof contactId === "number") {
      return invalidImgIds.includes(contactId)
        ? `https://picsum.photos/id/${contactId + 1}/150/150`
        : `https://picsum.photos/id/${contactId}/150/150`;
    }
    return `https://robohash.org/1.png?size=150x150`;
  }

  return (
    <div id="contact">
      <div>
        <Image
          key={contact.id}
          className="contactImg"
          src={createImage(contact.id)}
          width={150}
          height={150}
          alt="Contact Image"
          priority={true}
          onError={(e) =>
            (e.target.src = `https://robohash.org/${contact.id}.png?size=200x200`)
          }
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
          <div>
            <b>Email</b>: {contact.email}
          </div>
          <div>
            <b>Phone</b>: {contact.phone}
          </div>
        </div>
        <div className="contactPhysicals">
          <div>
            <b>Height</b>: {contact.height} cm
          </div>
          <div>
            <b>Weight</b>: {contact.weight} kg
          </div>
        </div>
      </div>
    </div>
  );
}
