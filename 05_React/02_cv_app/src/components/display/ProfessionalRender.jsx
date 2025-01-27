import React from 'react'

export default function ProfessionalRender({ reduceData }) {
  return (
    <div className="longRowCntr">
        <h2>Professional Qualifications</h2>
        {reduceData.filter((dataRow) => dataRow.visible).map((dataRow) =>  {
            return (
            <div className="longRowEntry" key={dataRow.id} > 
                <div className="topRow">
                    <div className="leftCol">
                        <div className="topLeft">{dataRow.position}</div>
                        <div>{dataRow.company}</div>
                    </div>
                    <div className="rightCol">
                        <div className="topRight">{dataRow.start +" - "+ dataRow.end}</div>
                        <div>{dataRow.location}</div>
                    </div>
                </div>
                <div className="bottomRow">{dataRow.description}</div>
            </div>
            )}
        )}
    </div>
  )
}
