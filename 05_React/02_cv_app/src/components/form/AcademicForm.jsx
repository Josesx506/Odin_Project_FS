"use client";

import { ACTIONS, isEmptyObject } from "@/app/utils";
import "@/styles/Form.css";
import { useRef } from "react";
import { DelIcon } from "../Button";
import CreateInput, { formatDate } from './Form';


/**
 * id - enclosing div id
 * legend - string for making html element #ids
 * dispatch - useReducer set function
 * toggleForm - useState set function
 * editRef - useRef variable to track edits
 * Other args - variable to track changes across function scop
 * idData, sch, deg, sdt, edt, lctn, vsb = "" 
 * @param {*} param0 
 * @returns 
 */
export default function AcademicForm({ id="academics", legend="Education", dispatch={}, toggleForm={}, editRef, 
                                       idData="", sch="", deg="", sdt="", edt="", lctn="", vsb="" }) {  
  
  const editMode = isEmptyObject(editRef.current);
  if (editMode) {
    let payload = editRef.current;
    idData = payload["id"];
    sch = payload["school"];
    deg = payload["degree"];
    sdt = formatDate(new Date(payload["start"]));
    edt = formatDate(new Date(payload["end"]));
    lctn = payload["location"];
    vsb = payload["visible"];
  }

  // Define refs for storing data
  const schoolRef= useRef(sch);
  const degreeRef= useRef(deg);
  const startDtRef= useRef(sdt);
  const endDtRef= useRef(edt);
  const locationRef= useRef(lctn);

  const resetRefs = () => {
    for (let ref of [schoolRef,degreeRef,locationRef]) {
      ref.current.value = "";
    }
    startDtRef.current.value = formatDate(new Date());
    endDtRef.current.value = formatDate(new Date());
    editRef.current = {};
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    let formEntries = {
        "school": schoolRef.current.value,
        "degree": degreeRef.current.value,
        "start": formatDate(new Date(startDtRef.current.value), true),
        "end": formatDate(new Date(endDtRef.current.value), true),
        "location": locationRef.current.value,
        "visible": true,
    }
    if (!editMode) {
      formEntries["id"] = crypto.randomUUID();  // create id for new entries
      dispatch({ type: ACTIONS.ADD_EDU, payload: formEntries });
    } else {
      let formEntries = {
        "id": idData,
        "school": schoolRef.current.value,
        "degree": degreeRef.current.value,
        "start": formatDate(new Date(startDtRef.current.value), true),
        "end": formatDate(new Date(endDtRef.current.value), true),
        "location": locationRef.current.value,
        "visible": vsb,}
      
      dispatch({ type: ACTIONS.EDIT_EDU, payload: formEntries });
    };
    // Reset the refs without resetting the form and hide it
    resetRefs()
    toggleForm(false);
  }

  function handleCancel(e) {
    console.log("cancel form");
    e.preventDefault();
    e.stopPropagation();
    resetRefs();
    toggleForm(false);
  }

  function handleDelete(e) {
    console.log("delete entry");
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: ACTIONS.DEL_EDU, payload: {id: idData} });
    resetRefs();
    toggleForm(false);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} id={id}>
          <CreateInput key={0} value={sch} legend={legend} label="School" type="text" inpRef={schoolRef} required={true} />
          <CreateInput key={1} value={deg} legend={legend} label="Degree" type="text" inpRef={degreeRef} />
          <div className="form_input_div dt">
              <CreateInput key={2} value={sdt} legend={legend} label="Start Date" type="date" inpRef={startDtRef}/>
              <CreateInput key={3} value={edt} legend={legend} label="End Date" type="date" inpRef={endDtRef} />
          </div>
          <CreateInput key={4} value={lctn} legend={legend} label="Location" type="text" inpRef={locationRef} />
          
          <div className="form__actnBtsn">
              <div className="form__actnBtsn left">
                  <button className="form__actnBtsn delete" type="button" 
                          onClick={handleDelete} disabled={!editMode}>{DelIcon}Delete</button>
              </div>
              <div className="form__actnBtsn right">
                  <button className="form__actnBtsn cancel" type="button" 
                          onClick={handleCancel}>Cancel</button>
                  <button className="form__actnBtsn save" type="submit">Save</button>
              </div>
          </div>
      </form>
    </div>
  )
}
