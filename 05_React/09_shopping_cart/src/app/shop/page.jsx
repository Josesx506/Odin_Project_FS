import React from "react"
import Link from "next/link";
import Image from "next/image";
import "../../styles/categories.css"


export default function Page() {
  const pathname =  "/shop";
  return (
    <div>
      <h2 style={{textAlign:"center", fontFamily:"var(--font-roboto"}}>View Trending Categories</h2>
      <div className="categoriesGrid">
        <Link className="ctgrCntr one" href={`${pathname}/accessories`}>
          <Image src={"https://images.pexels.com/photos/1460838/pexels-photo-1460838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
          width={300} height={200} alt="shop accessories" />
          <div>Accessories</div>
        </Link>
        <Link className="ctgrCntr two" href={`${pathname}/beauty`}>
          <Image src={"https://images.pexels.com/photos/1377034/pexels-photo-1377034.jpeg?auto=compress&cs=tinysrgb&w=600"} 
          width={300} height={200} alt="shop cosmetics"/>
          <div>Beauty</div>
        </Link>
        <Link className="ctgrCntr three" href={`${pathname}/electronics`}>
          <Image src={"https://images.pexels.com/photos/5076522/pexels-photo-5076522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
          width={300} height={400} alt="shop electronics" />
          <div>Electronics</div>
        </Link>
        <Link className="ctgrCntr four" href={`${pathname}/men`}>
          <Image src={"https://images.pexels.com/photos/8107218/pexels-photo-8107218.jpeg?auto=compress&cs=tinysrgb&w=600"} 
          width={300} height={450} alt="shop electronics" />
          <div>Men</div>
        </Link>
        <Link className="ctgrCntr five" href={`${pathname}/watches`}>
          <Image src={"https://images.pexels.com/photos/1162519/pexels-photo-1162519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
          width={300} height={400} alt="shop electronics" />
          <div>Watches</div>
        </Link>
        <Link className="ctgrCntr six" href={`${pathname}/women`}>
          <Image src={"https://images.pexels.com/photos/1253413/pexels-photo-1253413.jpeg?auto=compress&cs=tinysrgb&w=600"} 
          width={300} height={450} alt="shop electronics" />
          <div>Women</div>
        </Link>
        <Link className="ctgrCntr seven" href={`${pathname}/all`}>
          <Image src={"https://images.pexels.com/photos/3056057/pexels-photo-3056057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
          width={300} height={200} alt="shop electronics" />
          <div>All</div>
        </Link>
      </div>
    </div>
  )
}


