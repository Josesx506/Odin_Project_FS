'use client';
import { useState } from 'react';

import styles from "./page.module.css";
import Hidden from "@/images/Hidden_People.jpg"

import GameProvider from "@/components/GameProvider";
import RegisterImage from '@/components/RegisterImage';

// export default function Home() {

//   let items = [{ 'name': "Waldo" }, { 'name': 'Wally' }];
//   const url = "https://res.cloudinary.com/dwb3wrscb/image/upload/v1745279687/hidden_pictures_t56hlf.png"

//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <GameProvider id={1} imgSrc={url} items={items} />
//       </main>
//     </div>
//   );
// }


export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    age: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await fetch('./api/registerImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      console.log(data);
      
      if (data.status === 'success') {
        alert('Image registered successfully!');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div>
      <RegisterImage />
      {/* <form onSubmit={handleSubmit}>

        <label htmlFor="name">Enter Name </label>
        <input type="text" name="name" id="name" 
            value={formData.name}
            onChange={handleChange} />


        <label htmlFor="age"> Enter Age </label>
        <input type="text" name="age" id="age" 
            value={formData.age}
            onChange={handleChange} />

        <input type="submit" value="submit" />

      </form> */}
    </div>
  )
}