"use client"

import Form from 'next/form'
import { useRouter } from "next/navigation"
import { useRef } from 'react'
import "../../styles/form.css"
import { createContact } from '@/utils/loadDummyData'
import { useContacts } from '@/contexts/ContactsContext'



export default function Page() {
  const { old, setContacts } = useContacts();
  const router = useRouter();

  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const emailRef = useRef(null);
  const telRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    let name = nameRef.current?.value || "";
    const data = {
      id: crypto.randomUUID(),
      firstName: name.split(" ")[0] || "",
      lastName: name.split(" ")[1] || "",
      gender: genderRef.current?.value || "M",
      email: emailRef.current?.value || "badentry@email.xyz",
      phone: telRef.current?.value || "+123",
      height: heightRef.current?.value || 100.5,
      weight: weightRef.current?.value || 50.5,
    }

    const newContacts = await createContact(data);
    setContacts(newContacts);
    console.log(data);

    // Reset refs
    const allRefs = [nameRef,genderRef,emailRef,telRef,heightRef,weightRef];
    allRefs.forEach(ref => {
      if (ref.current)  ref.current.value = "";
    })

    router.push("/contacts/")
  }

  return (
    <div>
      <h1>Create New Contact</h1>
      <Form className='createContact' onSubmit={handleSubmit}>
        <div className="createInputs">
          <div className="formRow">
            <div className='createInput'>
              <label htmlFor="formName">Name:</label>
              <input ref={nameRef} name='formName' placeholder='First and Last Name' required type="text" />
            </div>
            <div className='createInput'>
              <label htmlFor="formGender">Gender:</label>
              <input ref={genderRef} name='formGender' placeholder='M/F' type="text" />
            </div>
          </div>
          <div className="formRow">
            <div className='createInput'>
              <label htmlFor="formEmail">Email:</label>
              <input ref={emailRef} name="formEmail" placeholder="abc@xyzmail.com" type="email" />
            </div>
            <div className='createInput'>
              <label htmlFor="formPhone">Phone:</label>
              <input ref={telRef} name='formPhone' placeholder="+234 ..." type="tel" />
            </div>
          </div>
          <div className="formRow">
            <div className='createInput'>
              <label htmlFor="formHeight">Height:</label>
              <input ref={heightRef} name='formHeight' placeholder="1X.xx" type="number" />
            </div>
            <div className='createInput'>
              <label htmlFor="formWeight">Weight:</label>
              <input ref={weightRef} name='formWeight' placeholder="1X.xx" type="number" />
            </div>
          </div>
        </div>
        <div className="submitInputs">
          <button type="submit">Submit</button>
        </div>
      </Form>
    </div>
  )
}
