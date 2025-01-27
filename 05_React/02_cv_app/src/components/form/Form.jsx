import React from "react"
import "@/styles/Form.css"

/**
 * Convert a string to camelCase
 * @param {*} str 
 * @returns 
 */
function toCamelCase(str) {
    const words = str.trim().split(" ");
    const firstWord = words[0].toLowerCase();
    const capitalizedWords = words.slice(1).map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return [firstWord, ...capitalizedWords].join("");
}

function getPlaceholders(label) {
    const lowerLabel = label.toLowerCase();
    switch (true) {
        case lowerLabel.includes("name"):
            return "Enter Full Name";
            break;
        case lowerLabel.includes("email"):
            return "Enter Email";
            break;
        case lowerLabel.includes("phone"):
            return "Enter Phone Number"
            break;
        case lowerLabel.includes("address"):
            return "Enter City/Country";
            break;
        case lowerLabel.includes("location"):
            return "Enter City/Country";
            break;
        case lowerLabel.includes("school"):
            return "Enter School/University";
            break;
        case lowerLabel.includes("degree"):
            return "Enter Degree";
            break;
        case lowerLabel.includes("company"):
            return "Enter Company Name";
            break;
        case lowerLabel.includes("position"):
            return "Enter Role";
            break;
        case lowerLabel.includes("description"):
            return "Enter Description";
            break;
        default:
            return "Enter Input";
            break;
    }
}

function getRequired(label) {
    // Check if the field is required - form validation
    const lowerLabel = label.toLowerCase();
    const required = ["name","email","phone","address","school","company"];
    return required.some((req) => (lowerLabel.includes(req)));
}

function formatDate(dateVal, fmt=false) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
    let yr = dateVal.getFullYear();
    let mn = dateVal.getMonth();
    let dy = dateVal.getDate();
    let dt;
    if (fmt) {dt = `${monthNames[mn]} ${yr}`}
    else {dt = `${yr}-${String(mn + 1).padStart(2, "0")}-${String(dy).padStart(2, "0")}`}

    return dt
}



function CreateInput({ value, legend, label, type, inpRef , required=false, class_="form_input_div"}) {
    const inputId = toCamelCase(legend) + "-" + toCamelCase(label);

    const getInputElement = () => {
        if (type === "date") {
            let nwDate = new Date();
            let defVal = formatDate(nwDate);
            return <input type={type} id={inputId} ref={inpRef} defaultValue={value === "" ? defVal : value} min={"1980-01-01"} />
        } else if (type === "textarea") {
            let plcHld = getPlaceholders(label);
            return <textarea id={inputId} ref={inpRef} placeholder={plcHld} rows={3} defaultValue={value} />
        } else if (required) {
            let plcHld = getPlaceholders(label);
            return <input type={type} id={inputId} ref={inpRef} placeholder={plcHld} defaultValue={value} required />
        } else {
            let plcHld = getPlaceholders(label);
            return <input type={type} id={inputId} ref={inpRef} placeholder={plcHld} defaultValue={value} />
        }
    }

    return (
        <div className={class_}>
            <label htmlFor={inputId}>{label}</label>
            {getInputElement()}
        </div>
    )
}

export default CreateInput;
export { toCamelCase, getPlaceholders, formatDate }