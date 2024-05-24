// const fs = require("fs");
import "@fortawesome/fontawesome-free/js/all";
import "./css/index.css";

import renderHome from "./pages/home";
import MultipleContainers from "./utils/sortable"


// Cache nav buttons and body
const navOdHome = document.querySelector(".odin-home")
const navHome = document.querySelector(".home")
const navCalendar = document.querySelector(".calendar")
const body = document.getElementById("content")

function loadcomponent(pages) {
    body.innerHTML = ""
    body.appendChild(pages);
};

// Load the home page for the first time
const onload = new renderHome();
loadcomponent(onload);
MultipleContainers();





// localStorage.setItem("app", JSON.stringify("padi mi"))
// let app= JSON.parse(localStorage.getItem("app"))
// console.log(app);