// const fs = require("fs");
import "@fortawesome/fontawesome-free/js/all";
import "./css/index.css";

import { refreshData, writeData } from "./utils/crud"
import { projectItem, todoItem } from "./utils/structs";
import {renderHome} from "./pages/home";
import {renderCalendar} from "./pages/calendar";
import MultipleContainers from "./utils/sortable"


// Cache nav buttons and body
const navHome = document.querySelector(".home");
const navCalendar = document.querySelector(".calendar");
const body = document.getElementById("content");

// Register the json file in localStorage
// localStorage.setItem("dbJSON", null);

function clearElement(element) {
    if (!element) return;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

function renderEntirePage(pages) {
    if (!pages || !body) return;
    clearElement(body);
    body.appendChild(pages);
};

// Load the home page for the first time
renderEntirePage(renderHome());

// Event Listener for the pages
navHome.addEventListener("click", (e) => {
    renderEntirePage(renderHome())
});
navCalendar.addEventListener("click", (e) => {
    console.log("home click");
    renderEntirePage(renderCalendar())
});

// Cache the form entries
const projEntryForm = document.querySelector(".new-project-form");
const projEntryInput = document.querySelector(".new-project-entry");
const projTitleCntrs = document.querySelector(".projects-sidebar-cntr");
const todoListCntrs = document.querySelector(".priority-containers");

function renderTodoLists(cntr, itemsData) {
    // if (!cntr || !itemsData) return;
    console.log(cntr);
    clearElement(cntr);
};


projEntryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projName = projEntryInput.value;
    if (projName === null || projName === "") {
        console.log(`${projName} is a failed entry`);
        return;
    } else {
        const newProj = new projectItem(projName, false, []);
        console.log(newProj);
        const data = refreshData();
        data.push(newProj);
        writeData(data); // Write the data to local storage
        renderEntirePage(renderHome());
    };
});

projTitleCntrs.addEventListener("click", (e) => {
    const targets = e.target.classList.value;
    if (targets.includes("project-item-cntr") || targets === "project-item-selector") {
        let allCntrs = todoListCntrs.childNodes;
        let selectedProjId = parseInt(e.target.dataset.id);
        if (isNaN(selectedProjId)) {selectedProjId = parseInt(e.target.parentElement.dataset.id)};
        let projData = refreshData();
        let selectedProj = projData[selectedProjId];
        selectedProj.active = true;
        let todoData = selectedProj.items;
        writeData(projData);

        // console.log(todoData);
        // allCntrs.forEach((parentCntr) => {
        //     renderTodoLists(parentCntr.childNodes[1],todoData);
        //     console.log(parentCntr.childNodes[1]);
        // })
        
    };
})


MultipleContainers();





// localStorage.setItem("app", JSON.stringify("padi mi"))
// let app= JSON.parse(localStorage.getItem("app"))
// console.log(app);