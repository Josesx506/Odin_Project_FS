import React from 'react'
import { Vsble, Ivsbl } from "../Button";
import "@/styles/ShortRow.css";
import SubmitBtn from "@/components/Button"
import { ACTIONS } from '@/app/utils';

/**
 * reduceData - state data from useReducer
 * targetKey - key name that should be shown e.g. school
 * editRef - ref object to persist data when editing form entries
 * dispatch - useReducer set function
 * toggleForm - setState function to switch between view state and form state on homepage
 * @param {*} param0 
 * @returns 
 */
export default function DropdownRow( { reduceData, targetKey, btnName="Add", editRef, dispatch={}, toggleForm={} } ) {
  function handleAddNew(e) {
    e.stopPropagation();
    e.preventDefault();
    toggleForm(true);
  }

  function handleEditRow(e,data, editRef) {
    e.stopPropagation();
    e.preventDefault();
    console.log("editing row ongoing");
    editRef.current = data;
    toggleForm(true);
  }

  function handleRowVisibility(e, data) {
    e.stopPropagation();
    e.preventDefault();
    switch (targetKey) {
      case "school":
        dispatch({ type: ACTIONS.TGGL_EDU, payload: {id: data.id} })
      case "company":
        dispatch({ type: ACTIONS.TGGL_PRF, payload: {id: data.id} })
    }
    console.log("toggling row visibility - incomplete");
  }

  return (
    <div className="shortRowCntr">
      {reduceData.map((dataRow) => {
        return (
          <div className="shortRowEntry" key={dataRow.id} onClick={(e) => handleEditRow(e,dataRow,editRef)} > 
              <div>{dataRow[targetKey]}</div>
              <button onClick={(e) => handleRowVisibility(e, dataRow)}>{dataRow.visible ? Vsble : Ivsbl }</button>
          </div>
        )}
      )}
      <SubmitBtn value={btnName} handleClick={handleAddNew} />
    </div>
  )
}
