import "@/styles/Render.css";
import { PhnIcon, MaIcon, LocIcon } from "@/components/Button";

export default function PersonalRender({ nameVal, emailVal, phoneVal, addrVal }) {
  return (
    <div className="cv-header">
      <h1 className="cv-title">{nameVal}</h1>
      <div className="cv-subtitles">
        <div className="email">{PhnIcon}{emailVal}</div>
        <div className="phone">{MaIcon}{phoneVal}</div>
        <div className="address">{LocIcon}{addrVal}</div>
      </div>
    </div>
  )
}
