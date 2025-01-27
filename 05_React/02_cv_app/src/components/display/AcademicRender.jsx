import "@/styles/Render.css";
/**
 * reduceData - state data from useReducer
 * @param {*} param0 
 * @returns 
 */
export default function AcademicRender({ reduceData }) {
  return (
    <div className="longRowCntr">
        <h2>Education</h2>
        {reduceData.filter((dataRow) => dataRow.visible).map((dataRow) =>  {
            return (
            <div className="longRowEntry" key={dataRow.id} > 
                <div className="topRow">
                    <div className="leftCol">
                        <div className="topLeft">{dataRow.school}</div>
                        <div>{dataRow.degree}</div>
                    </div>
                    <div className="rightCol">
                        <div className="topRight">{dataRow.location}</div>
                        <div>{dataRow.start +" - "+ dataRow.end}</div>
                    </div>
                </div>
                <div className="bottomRow">{}</div>
            </div>
            )}
        )}
    </div>
  )
}
