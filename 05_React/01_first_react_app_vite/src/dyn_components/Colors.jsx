import { useState } from "react";


function Colors() {
  const COLORS = ["pink", "green", "blue", "yellow", "purple"];
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
  const [numChanges, setNumChanges] = useState(0);

  return (
    <>
    <div className="colorCntr" style={{ backgroundColor, }}>
      {/* Map the array of colors. Notice the `key` argument */}
      {COLORS.map((color) => (
        <button type="button" key={color}
          onClick={() => {
            setBackgroundColor(color);
            backgroundColor !== color && setNumChanges(numChanges + 1);
          }}
          className={backgroundColor === color ? "selected" : ""}
        >
          {color}
        </button>
      ))}
    </div>
    <div>The colors have been changed {numChanges} time{numChanges === 1 ? "": "s"}</div>
    </>
  );
}

export default Colors;