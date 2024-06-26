import "@fortawesome/fontawesome-free/js/all";
import "./css/index.css";

import { refreshData, writeData } from "./utils/crud"
import { projectItem, todoItem } from "./utils/structs";
import {renderHome} from "./pages/home";
import { createTodoListForm, editTodoListForm, expandTodoView } from "./utils/forms";
import { createModal } from "./modals/modals";
import { MultipleContainers } from "./utils/sortable";
import { renderCalendar } from "./pages/calendar";


// Cache nav buttons and body
const navHome = document.querySelector(".home");
const navCalendar = document.querySelector(".calendar");
const body = document.getElementById("content");
const overlay = document.getElementById("overlay");

function dynamicEventListeners() {
    // Cache the form entries
    const projEntryForm = document.querySelector(".new-project-form");
    const projEntryInput = document.querySelector(".new-project-entry");
    const projTitleCntrs = document.querySelectorAll(".project-item-cntr");
    const deleteProjBtns = document.querySelectorAll(".delete-project-btn");
    const todoListCntrs = document.querySelector(".priority-containers");
    const popAddTodoEntry = document.querySelector(".add-todo");
    const modalCntr = document.querySelector(".modal");
    const closeModalBtn = document.querySelector(".modal-close-btn");
    const todoEntryForm = document.querySelector("#new-todo-list-entry-cntr");
    const checkTodos = document.querySelectorAll(".check-todo-entry");
    const editTodos = document.querySelectorAll(".edit-todo-item");
    const deleteTodos = document.querySelectorAll(".delete-todo-item");
    const expandTodos = document.querySelectorAll("div.todo-item");

    function submitModalFormEntry() {
        let formInput = document.querySelectorAll(".todo-list-entry-input");
        let newItem = new todoItem();
        let projTitle;
        formInput.forEach((inputdiv) => {
            let [key, value] = [inputdiv.dataset.dataKey, inputdiv.childNodes[1].value];
            if (key === "proj-title") {
                projTitle = value;
            } else if (key === "dueDate") {
                newItem[key] = new Date(value);
            } else {
                newItem[key] = value;
            };
        })
        newItem.completed = false;

        try {
            modalCntr.remove();
            const data = refreshData();
            const projIdx = data.findIndex((proj) => proj.title === projTitle);
            data.map(proj => proj.active = false);
            data[projIdx].items.push(newItem);
            data[projIdx].active = true;
            writeData(data); 
            renderEntireHomePage(renderHome());
        } catch {
            renderEntireHomePage(renderHome());
        }
    };

    function updateModalFormEntry(todoId,checked) {
        let formInput = document.querySelectorAll(".todo-list-entry-input");
        let newItem = new todoItem();
        let projTitle;
        formInput.forEach((inputdiv) => {
            let [key, value] = [inputdiv.dataset.dataKey, inputdiv.childNodes[1].value];
            if (key === "proj-title") {
                projTitle = value;
            } else if (key === "dueDate") {
                newItem[key] = new Date(value);
            } else {
                newItem[key] = value;
            };
        })
        newItem.completed = checked;
        
        try {
            modalCntr.remove();
            const data = refreshData();
            const projIdx = data.findIndex((proj) => proj.title === projTitle);
            data.map(proj => proj.active = false);
            data[projIdx].items[todoId] = newItem;
            data[projIdx].active = true;
            writeData(data); 
            renderEntireHomePage(renderHome());
        } catch {
            renderEntireHomePage(renderHome());
        }
    };
    
    projEntryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const projName = projEntryInput.value;
        if (projName === null || projName === "") {
            console.log(`${projName} is a failed entry`);
            return;
        } else {
            const newProj = new projectItem(projName, true, []);
            const data = refreshData(true);
            data.push(newProj);
            writeData(data); // Write the data to local storage
            renderEntireHomePage(renderHome());
        };
    });

    projTitleCntrs.forEach(div => {
        div.addEventListener("click", (e) => {
            e.preventDefault();
            const target = div.closest(".project-item-cntr");
            let allCntrs = todoListCntrs.childNodes;
            allCntrs.forEach(i => i.classList.remove("selected"));
            let selectedProjId = parseInt(target.dataset.id);
            let projData = refreshData(true);
            let selectedProj = projData[selectedProjId];
            if (selectedProj === undefined || selectedProj === null) return;
            selectedProj.active = true;
            writeData(projData);
            renderEntireHomePage(renderHome());
        })
    })

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

    checkTodos.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const mainCntr = item.closest(".todo-item");
            let [projTitle,todoId] = [mainCntr.dataset.projTitle,parseInt(mainCntr.dataset.id)];
            const checkCntr = mainCntr.querySelector(".todo-item-left-cntr");
            const checkBtn = mainCntr.querySelector(".check-todo-item");

            const data = refreshData();
            const projIdx = data.findIndex(proj => proj.title === projTitle);

            if (item.checked) {
                data[projIdx].items[todoId].completed = true;
            } else {
                data[projIdx].items[todoId].completed = false;
            };
            writeData(data);
            renderEntireHomePage(renderHome());
        })
    });

    editTodos.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            // Prevent the event from bubbling up to the parent and clashing with expandTodos
            e.stopPropagation();
            const mainCntr = item.closest(".todo-item");
            let [projTitle,todoId] = [mainCntr.dataset.projTitle,parseInt(mainCntr.dataset.id)];
            
            const data = refreshData();
            const projIdx = data.findIndex(proj => proj.title === projTitle);
            const todoItem = data[projIdx].items[todoId];

            if (modalCntr) {
                const title = modal.querySelector(".modal-title");
                title.textContent = "Edit Todo";
                modalCntr.childNodes[1].remove();
                modalCntr.appendChild(editTodoListForm(projTitle, todoItem));
            };

            overlay.classList.add("active");
            modalCntr.classList.add("active");

            const todoEditForm = document.querySelector("#new-todo-list-entry-cntr");
            todoEditForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const mainCntr = item.closest(".todo-item");
                const leftCntr = mainCntr.querySelector(".todo-item-left-cntr");
                const checkStatus = leftCntr.classList.contains("checked");
                const projId = parseInt(mainCntr.dataset.id);
                updateModalFormEntry(projId, checkStatus);
            });
        })
    })

    deleteTodos.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const mainCntr = item.closest(".todo-item");
            let [projTitle,todoId] = [mainCntr.dataset.projTitle,parseInt(mainCntr.dataset.id)];
            const data = refreshData();
            const projIdx = data.findIndex(proj => proj.title === projTitle);
            data[projIdx].items.splice(todoId,1);
            writeData(data);
            renderEntireHomePage(renderHome());
        })
    });

    expandTodos.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const mainCntr = item.closest(".todo-item");
            let [projTitle,todoId] = [mainCntr.dataset.projTitle,parseInt(mainCntr.dataset.id)];
            
            const data = refreshData();
            const projIdx = data.findIndex(proj => proj.title === projTitle);
            const todoItem = data[projIdx].items[todoId];

            if (modalCntr) {
                const title = modal.querySelector(".modal-title");
                title.textContent = todoItem.title;
                modalCntr.childNodes[1].remove();
                modalCntr.appendChild(expandTodoView(todoItem));
            };

            overlay.classList.add("active");
            modalCntr.classList.add("active");
        });
    });

    popAddTodoEntry.addEventListener("click", (e) => {
        overlay.classList.add("active");
        modalCntr.classList.add("active");
    });

    todoEntryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        submitModalFormEntry();
    });

    closeModalBtn.addEventListener("click", (e) => {
        todoEntryForm.reset();
        const modal = closeModalBtn.closest(".modal");
        resetModal(modal);
        closeModal(modal);
    });
}

// Reset the json file in localStorage
// localStorage.setItem("dbJSON", null);

function resetModal(modal) {
    const title = modal.querySelector(".modal-title");
    title.textContent = "New Todo";
    modal.childNodes[1].remove();
    modal.appendChild(createTodoListForm());
};

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
    const modalCntr = document.querySelector(".modal");
    if (modalCntr) {modalCntr.remove()};
    document.body.appendChild(createModal("New Todo",createTodoListForm()));
    overlay.classList.remove("active");
    MultipleContainers();
    dynamicEventListeners();
};

function renderEntireCalendarPage() {
    if (!body) return;
    clearElement(body);
    renderCalendar(body)
};

function closeModal(modal) {
    if (modal === null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
};






// Load the home page for the first time
renderEntireHomePage(renderHome());

// Event Listener for the pages
navHome.addEventListener("click", (e) => {
    renderEntireHomePage(renderHome());
    dynamicEventListeners();
});

navCalendar.addEventListener("click", (e) => {
    renderEntireCalendarPage();
});

overlay.addEventListener("click", (e) => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal => {
        resetModal(modal);
        closeModal(modal);
    })
})
