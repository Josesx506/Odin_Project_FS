import DropdownRow from "./DropdownRow";

export default function ProfessionRow({ data, toggleForm, editRef ,dispatch }) {
  return (
    <div>
      <DropdownRow reduceData={data} targetKey="company" btnName="Role" toggleForm={toggleForm} editRef={editRef} dispatch={dispatch} />
    </div>
  )
}
