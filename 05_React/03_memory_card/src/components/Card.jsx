import React from 'react'
import "@/styles/Card.css"

export default function Card({name, imgUrl, handleClick}) {
  return (
    <div>
      <div onClick={(e) => handleClick(e,name)} className="card-pokemon">
        <div className='card-img-cntr'>
            <img src={imgUrl} alt={"pokemon-"+name} className="card-img" />
        </div>
        <div className="card-name">{name}</div>
      </div>
    </div>
  )
}
