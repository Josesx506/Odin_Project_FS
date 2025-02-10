import { faInstagram, faMeta, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import "../styles/footer.css"

export default function Footer() {
  const xtwit = <FontAwesomeIcon icon={faXTwitter} />
  const meta = <FontAwesomeIcon icon={faMeta} color="rgb(6,104,225)" />
  const instg = <FontAwesomeIcon icon={faInstagram} color="rgb(242,0,193)" />
  const ytb = <FontAwesomeIcon icon={faYoutube} color="red" />
  
  return (
    <div className="Footer">
      <div className="leftFtr">
        <h2>Odin Shop</h2>
        <p className="dummyText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus 
            facere aut obcaecati. Impedit totam voluptatibus modi, error fugiat officiis.
        </p>
      </div>
      <div className="navFtr">
        <h2>Navigation</h2>
        <div className="navFtrLinks">
          <Link href="/shop/men">Men</Link>
        </div>
        <div className="navFtrLinks">
          <Link href="/shop/women">Women</Link></div>
        <div className="navFtrLinks">
          <Link href="/shop/accessories">Accessories</Link>
        </div>
      </div>
      <div className="navSocials">
        <h2>Socials</h2>
        <div className="socialIcons">
            <div>
              <div>{ytb}</div>
              <div>{instg}</div>
            </div>
            <div>
              <div>{meta}</div>
              <div>{xtwit}</div>
            </div>
        </div>
      </div>
    </div>
  )
}
