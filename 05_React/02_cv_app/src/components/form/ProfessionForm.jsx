"use client";

import { useRef } from "react";
import "@/styles/Form.css";
import CreateInput, { toCamelCase, formatDate } from './Form';
import { DelIcon } from "../Button";
import { ACTIONS, isEmptyObject } from "@/app/utils";

export default function ProfessionForm({ id="professions", legend="Experience", dispatch={}, toggleForm={}, editRef, 
                                          idData="", cmp="", pos="", sdt="", edt="", lctn="", desc="", vsb="" }) { 
  
  const editMode = isEmptyObject(editRef.current);
  if (editMode) {
    let payload = editRef.current;
    idData = payload["id"];
    cmp = payload["company"];
    pos = payload["position"];
    sdt = formatDate(new Date(payload["start"]));
    edt = formatDate(new Date(payload["end"]));
    lctn = payload["location"];
    desc = payload["description"];
    vsb = payload["visible"];
  }
  // Define refs for storing data
  const companyRef= useRef(cmp);
  const positionRef= useRef(pos);
  const startDtRef= useRef(sdt);
  const endDtRef= useRef(edt);
  const locationRef= useRef(lctn);
  const descriptionRef= useRef(desc);

  const resetRefs = () => {
    for (let ref of [companyRef,positionRef,locationRef,descriptionRef]) {
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
        "company": companyRef.current.value,
        "position": positionRef.current.value,
        "start": formatDate(new Date(startDtRef.current.value), true),
        "end": formatDate(new Date(endDtRef.current.value), true),
        "location": locationRef.current.value,
        "description": descriptionRef.current.value,
        "visible": true,
    }
    if (!editMode) {
      formEntries["id"] = crypto.randomUUID();  // create id for new entries
      dispatch({ type: ACTIONS.ADD_PRF, payload: formEntries });
    } else {
      let formEntries = {
        "id": idData,
        "company": companyRef.current.value,
        "position": positionRef.current.value,
        "start": formatDate(new Date(startDtRef.current.value), true),
        "end": formatDate(new Date(endDtRef.current.value), true),
        "location": locationRef.current.value,
        "description": descriptionRef.current.value,
        "visible": vsb}
      dispatch({ type: ACTIONS.EDIT_PRF, payload: formEntries });
    }
    resetRefs()
    toggleForm(false);
  }

  function handleCancel(e) {
    e.preventDefault();
    e.stopPropagation();
    resetRefs();
    toggleForm(false);
  }

  function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: ACTIONS.DEL_PRF, payload: {id: idData} });
    resetRefs();
    toggleForm(false);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} id={id}>
          <CreateInput key={0} value={cmp} legend={legend} label="Company" type="text" inpRef={companyRef} required={true} />
          <CreateInput key={1} value={pos} legend={legend} label="Position" type="text" inpRef={positionRef} />
          <div className="form_input_div dt">
              <CreateInput key={2} value={sdt} legend={legend} label="Start Date" type="date" inpRef={startDtRef}/>
              <CreateInput key={3} value={edt} legend={legend} label="End Date" type="date" inpRef={endDtRef} />
          </div>
          <CreateInput key={4} value={lctn} legend={legend} label="Location" type="text" inpRef={locationRef} />
          <CreateInput key={5} value={desc} legend={legend} label="Description" type="textarea" inpRef={descriptionRef} />
          
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
