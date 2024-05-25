// const fs = require("fs");
import "@fortawesome/fontawesome-free/js/all";
import "./css/index.css";

import { refreshData, writeData } from "./utils/crud"
import { projectItem, todoItem } from "./utils/structs";
import {renderHome} from "./pages/home";
import { createTodoListForm } from "./utils/forms";
import MultipleContainers from "./utils/sortable";
import {renderCalendar} from "./pages/calendar";


// Cache nav buttons and body
const navHome = document.querySelector(".home");
const navCalendar = document.querySelector(".calendar");
const body = document.getElementById("content");

function dynamicEventListeners() {
    // Cache the form entries
    const projEntryForm = document.querySelector(".new-project-form");
    const projEntryInput = document.querySelector(".new-project-entry");
    const projTitleCntrs = document.querySelector(".projects-sidebar-cntr");
    const deleteProjBtns = document.querySelectorAll(".delete-project-btn");
    const todoListCntrs = document.querySelector(".priority-containers");
    const addTodoEntry = document.querySelector(".add-todo");
    
    projEntryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const projName = projEntryInput.value;
        if (projName === null || projName === "") {
            console.log(`${projName} is a failed entry`);
            return;
        } else {
            const newProj = new projectItem(projName, false, []);
            const data = refreshData();
            data.push(newProj);
            writeData(data); // Write the data to local storage
            renderEntireHomePage(renderHome());
        };
    });

    projTitleCntrs.addEventListener("click", (e) => {
        const targets = e.target.classList.value;
        if (targets.includes("project-item-cntr") || targets === "project-item-selector") {
            let allCntrs = todoListCntrs.childNodes;
            allCntrs.forEach(i => i.classList.remove("selected"));
            let selectedProjId = parseInt(e.target.dataset.id);
            if (isNaN(selectedProjId)) {selectedProjId = parseInt(e.target.parentElement.dataset.id)};
            let projData = refreshData();
            projData.map((proj) => proj.active=false);
            let selectedProj = projData[selectedProjId];
            selectedProj.active = true;
            let todoData = selectedProj.items;
            writeData(projData);
            renderEntireHomePage(renderHome());
        };
    });

    deleteProjBtns.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const projId = parseInt(item.getAttribute("data-id"));
            let projData = refreshData();
            projData.splice(projId,1);
            writeData(projData);
            renderEntireHomePage(renderHome());
        })
    });

    addTodoEntry.addEventListener("click", (e) => {
        console.log(e.target.parentElement);
        // e.target.parentElement.innerHTML = "";
        // e.target.parentElement.appendChild(createTodoListForm());
        
    });
}


// Register the json file in localStorage
// localStorage.setItem("dbJSON", null);

function clearElement(element) {
    if (!element) return;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

function renderEntireHomePage(pages) {
    if (!pages || !body) return;
    clearElement(body);
    body.appendChild(pages);
    MultipleContainers();
    dynamicEventListeners();
};

function renderEntireCalendarPage(pages) {
    if (!pages || !body) return;
    clearElement(body);
    body.appendChild(pages);
};






// Load the home page for the first time
renderEntireHomePage(renderHome());

// Event Listener for the pages
navHome.addEventListener("click", (e) => {
    renderEntireHomePage(renderHome());
    dynamicEventListeners();
});

navCalendar.addEventListener("click", (e) => {
    renderEntireCalendarPage(renderCalendar());
});
