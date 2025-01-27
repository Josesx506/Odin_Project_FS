import DropdownRow from "./DropdownRow";

export default function AcademicRow({ data, toggleForm, editRef ,dispatch }) {
  return (
    <div>
      <DropdownRow reduceData={data} targetKey="school" btnName="Education" toggleForm={toggleForm} editRef={editRef} dispatch={dispatch} />
    </div>
  )
}
