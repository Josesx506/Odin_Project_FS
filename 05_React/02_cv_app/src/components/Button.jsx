import { faAngleDown, faAngleUp, faEye, faEyeSlash, faBriefcase, faCodeBranch,
         faTrash, faPhone, faEnvelope, faLocationDot, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/Button.css';

export default function SubmitBtn({value, icon="+", className="form__submitBtn", handleClick={}, disabled=false }) {
  return (
    <button className={className} onClick={handleClick} disabled={disabled}>{icon + "\t" + value}</button>
  )
}

const DelIcon = <FontAwesomeIcon icon={faTrash} />;
const UpIcon = <FontAwesomeIcon icon={faAngleUp} />;
const DwnIcon = <FontAwesomeIcon icon={faAngleDown} />;
const Vsble = <FontAwesomeIcon icon={faEye} />;
const Ivsbl = <FontAwesomeIcon icon={faEyeSlash} />;

const PhnIcon = <FontAwesomeIcon icon={faPhone} />
const MaIcon = <FontAwesomeIcon icon={faEnvelope} />
const LocIcon = <FontAwesomeIcon icon={faLocationDot} />
const BrfIcon = <FontAwesomeIcon icon={faBriefcase} />
const GdcIcon = <FontAwesomeIcon icon={faGraduationCap} />
const GthIcon = <FontAwesomeIcon icon={faCodeBranch} />


export { DelIcon, DwnIcon, UpIcon, Vsble, Ivsbl, PhnIcon, MaIcon, LocIcon, BrfIcon, GdcIcon, GthIcon };
