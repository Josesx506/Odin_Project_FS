"use client"

import Image from "next/image";
import { DwnIcon, UpIcon, GthIcon, BrfIcon, GdcIcon } from "@/components/Button";
import AcademicRender from "@/components/display/AcademicRender";
import PersonalRender from "@/components/display/PersonalRender";
import ProfessionalRender from "@/components/display/ProfessionalRender";
import AcademicForm from "@/components/form/AcademicForm";
import PersonalForm from "@/components/form/PersonalForm";
import ProfessionForm from "@/components/form/ProfessionForm";
import AcademicRow from "@/components/short/AcademicRow";
import ProfessionRow from "@/components/short/ProfessionRow";
import { useReducer, useRef, useState } from "react";
import styles from "./page.module.css";
import { ACTIONS } from "./utils";
import SubmitBtn from "@/components/Button";

export default function Home() {
  // Define refs for storing data
  const [name, setName] = useState("First & Last Name");
  const [email, setEmail] = useState("dummyemail @gmail.com");
  const [phone, setPhone] = useState("+44 9404 (mafo)");
  const [addr, setAddr] = useState("1 Duro tan bi ti loader");
  const formEditRef = useRef({}); // Reference object to update entries without rerendering


  function schoolReducer(schools, action) {
    switch(action.type) {
      case ACTIONS.ADD_EDU:
        return [...schools, action.payload]
      case ACTIONS.EDIT_EDU:
        return schools.map(school => {
          if (school.id === action.payload.id) {
            return {...action.payload}
          } else {return school}
        })
      case ACTIONS.TGGL_EDU:
        return schools.map(school => {
          if (school.id === action.payload.id) {
            return {...school, visible: !school.visible}
          } else {return school}
        })
      case ACTIONS.DEL_EDU:
        return schools.filter(school => school.id !== action.payload.id)
      case ACTIONS.RESET_EDU:
        return []
      default:
        return schools;
    }
  }
  
  function professionReducer(professions, action) {
    switch(action.type) {
      case ACTIONS.ADD_PRF:
        return [...professions, action.payload]
      case ACTIONS.EDIT_PRF:
        return professions.map(profession => {
          if (profession.id === action.payload.id) {
            return {...action.payload}
          } else {return profession}
        })
      case ACTIONS.TGGL_PRF:
        return professions.map(profession => {
          if (profession.id === action.payload.id) {
            return {...profession, visible: !profession.visible}
          } else {return profession}
        })
      case ACTIONS.DEL_PRF:
        return professions.filter(profession => profession.id !== action.payload.id)
      case ACTIONS.RESET_PRF:
        return []
      default:
        return professions;
    }

  }
  // Academics
  const [schools, dispatchSchool] = useReducer( schoolReducer, [] );
  const [drpdwnSch, setDrpdwnSch] = useState(false);
  const [isAcFormVisible, setAcFormVisible] = useState(false);
  // Professions
  const [professions, dispatchProfessions] = useReducer( professionReducer, [] );
  const [drpdwnPrf, setDrpdwnPrf] = useState(false);
  const [isPrFormVisible, setPrFormVisible] = useState(false);


  // Dummy data examples
  const dummyEducation = [{id:0, school:"University of Hard Knocks", degree:"MS", start:"May 2022", end:"Dec 2023", location:"Circle of life", visible:true},
    {id:1, school:"Science 101 for Dummies", degree:"BS", start:"May 2018", end:"Jan 2022", location:"Hustlin and Bustlin", visible:true }
  ];

  const dummyExperiences = [{id: 0, company:"Odin Project", position:"Full Stack Dev.", start:"Jan 2024", end:"Dec 2025", location:"Remote", description:"Develop web apps with HTML, CSS, JS, React, and Node.", visible:true},
    {id: 1, company:"Udacity", position:"Python Developer", start:"Jan 2023", end:"Feb 2024", location:"San Francisco, CA", description:"Develop online CS and DS trainings course using python, flask, pandas, and numpy.", visible:true},
    {id: 2, company:"Spotify", position:"SWE Intern", start:"Aug 2022", end:"Dec 2023", location:"New York City, NY", description:"Developed pipeline to improve streaming recommendations.", visible:true}
  ]

  const [dummyRender, setDummyRender] = useState(false);

  function loadDummy(e) {
    e.preventDefault();
    e.stopPropagation();
    dummyEducation.map((dummy) => {
      dispatchSchool( {type: ACTIONS.ADD_EDU, payload: dummy })
    })
    dummyExperiences.map((dummy) => {
      dispatchProfessions( {type: ACTIONS.ADD_PRF, payload: dummy })
    })
    setDummyRender((prev) => !prev);
  }

  function clearDummy(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatchSchool({type: ACTIONS.RESET_EDU });
    dispatchProfessions({type: ACTIONS.RESET_PRF });
    setDummyRender(false);
  }

  return (
    <div >
      <h1 style={{textAlign:"center"}}>CV Project with React and NextJS</h1>
      <main className={styles.mainPage}>
        <div className={styles.edit}>
          <div className={styles.editFormCntrs}>
            <div className={styles.editSctCntr}>
              <div className={styles.editSctHdr}>
                <h2>Personal Details</h2> 
              </div>
              <PersonalForm setName={setName} setEmail={setEmail} setPhone={setPhone} setAddr={setAddr} />
            </div>

            <div className={styles.editSctCntr}>
              <div className={styles.editSctHdr}>
                <h2>{GdcIcon} Education</h2> 
                <button onClick={() => setDrpdwnSch((prev)=> !prev)}>
                  {drpdwnSch ? UpIcon : DwnIcon}
                </button>
              </div>
              {drpdwnSch && !isAcFormVisible && <AcademicRow data={schools} dispatch={dispatchSchool} toggleForm={setAcFormVisible} editRef={formEditRef} />}
              {drpdwnSch && isAcFormVisible && <AcademicForm dispatch={dispatchSchool} toggleForm={setAcFormVisible} editRef={formEditRef} />}
            </div>
            <div className={styles.editSctCntr}>
              <div className={styles.editSctHdr}>
                <h2>{BrfIcon} Profession</h2> 
                <button onClick={() => setDrpdwnPrf((prev)=> !prev)}>
                  {drpdwnPrf ? UpIcon : DwnIcon}
                </button>
              </div>
              {drpdwnPrf && !isPrFormVisible && <ProfessionRow data={professions} dispatch={dispatchProfessions} toggleForm={setPrFormVisible} editRef={formEditRef} />}
              {drpdwnPrf && isPrFormVisible && <ProfessionForm dispatch={dispatchProfessions} toggleForm={setPrFormVisible} editRef={formEditRef} />}
            </div>
          </div>
          <div className={styles.dummyBtns}>
            <SubmitBtn value="Load Example" icon="" disabled={dummyRender} handleClick={loadDummy}/>
            <SubmitBtn className="form__submitBtn delete" value="Clear Example" icon="" handleClick={clearDummy}/>
          </div>
        </div>
        <div className={styles.render}>
          <div className={styles.cvHeader}>
            <PersonalRender nameVal={name} emailVal={email} phoneVal={phone} addrVal={addr} />
          </div>
          <div className={styles.cvBody}>
            <AcademicRender reduceData={schools}/>
            <ProfessionalRender reduceData={professions} />
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
       
        <a
          href="https://josesx506.github.io/Odin_Project_FS/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {GthIcon}
          Other Odin Projects
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
