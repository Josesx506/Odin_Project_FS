import _ from "lodash";
// import your function
import myName from "./myName";
import "./style.css";
import Icon from './icon.png';

function component() {
    const element = document.createElement("div");
  
    // Lodash, now imported by this script
    // element.innerHTML = _.join(["Hello", "webpack"], " ");

    // Update the elements text content with the custom function
    const myText = document.createElement("p");
    myText.textContent = myName("Cody");

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myText);
    element.appendChild(myIcon);
    element.classList.add("hello");

    return element;
  }
  
  document.body.appendChild(component());