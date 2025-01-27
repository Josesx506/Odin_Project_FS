"use client";

import { useRef, useEffect } from "react";
import "@/styles/Form.css";
import CreateInput, { toCamelCase,getPlaceholders } from './Form';
import { DelIcon } from "../Button";

export default function PersonalForm({ id="personal", legend="Personal Details", 
                                      setName, setEmail, setPhone, setAddr }) {
  //
  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("submitting")
    let formEntries = {
        "name": nameRef.current.value,
        "email": emailRef.current.value,
        "phone": phoneRef.current.value,
        "address": addrRef.current.value,
    }
    // if (isEdit) {formEntries["id"] = crypto.randomUUID()};
    // include logic for id for new entries with crypto.randomUUID()
    console.log(formEntries);
  }

  const handleNameChange = (e, update) => {
    update(e.target.value);
  };
  setName
  // const handleNameChange = (e) => {
  //   if (nameRef.current) {
  //     nameRef.current.textContent = e.target.value; // Update the <h1> dynamically
  //   }
  // };
  

  return (
    <div>
        <form onSubmit={handleSubmit} id={id}>
            <div key={0} className={"form_input_div"}>
                <label htmlFor={toCamelCase(legend) + "-" + toCamelCase("Full Name")}>{"Full Name"}</label>
                <input type={"text"} id={toCamelCase(legend) + "-" + toCamelCase("Full Name")}  onChange={(e)=> handleNameChange(e,setName)}
                placeholder={getPlaceholders("text")} required />
            </div>
            <div key={1} className={"form_input_div"}>
                <label htmlFor={toCamelCase(legend) + "-" + toCamelCase("Email")}>{"Email"}</label>
                <input type={"email"} id={toCamelCase(legend) + "-" + toCamelCase("Email")}  onChange={(e)=> handleNameChange(e,setEmail)}
                placeholder={getPlaceholders("email")} required />
            </div>
            <div key={2} className={"form_input_div"}>
                <label htmlFor={toCamelCase(legend) + "-" + toCamelCase("Phone Number")}>{"Phone Number"}</label>
                <input type={"tel"} id={toCamelCase(legend) + "-" + toCamelCase("Phone Number")}  onChange={(e)=> handleNameChange(e,setPhone)}
                placeholder={getPlaceholders("tel")} required />
            </div>
            <div key={3} className={"form_input_div"}>
                <label htmlFor={toCamelCase(legend) + "-" + toCamelCase("Address")}>{"Address"}</label>
                <input type={"text"} id={toCamelCase(legend) + "-" + toCamelCase("Address")}  onChange={(e)=> handleNameChange(e,setAddr)}
                placeholder={getPlaceholders("text")} required />
            </div>
        </form>
    </div>
  )
}