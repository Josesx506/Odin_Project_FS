import React from 'react'
import { MdOutlineSearch } from "react-icons/md";
import styles from '@/styles/forms/searchbar.module.css'

export default function SearchBar() {
  return (
    <div className={styles.searchCntr}>
      <MdOutlineSearch /> 
      <input type='search' placeholder='Search' />
    </div>
  )
}
