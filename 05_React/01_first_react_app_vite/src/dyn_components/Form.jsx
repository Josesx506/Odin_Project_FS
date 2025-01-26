import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleReset() {
    setFirstName('');
    setLastName('');
    setMessage('');
  }

  return (
    <form style={{border: "1px solid grey", padding: "0.5rem"}} onSubmit={e => e.preventDefault()}>
        <div style={{display: "flex", gap: "2rem", justifyContent: "center"}}>
            <input
                style={{fontSize: "1rem"}}
                placeholder="First name"
                value={firstName}
                onChange={handleFirstNameChange}
            />
            <input
                style={{fontSize: "1rem"}}
                placeholder="Last name"
                value={lastName}
                onChange={handleLastNameChange}
            />
        </div>
        <h4 style={{padding: "0.8rem 0"}}>Hi, {firstName} {lastName}</h4>
        <textarea
          placeholder="Feedback Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button onClick={handleReset}>Reset Form</button>
    </form>
  );
}
