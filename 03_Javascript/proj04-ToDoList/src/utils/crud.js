import todoData from "../db.json";
import { projectItem, todoItem, calendarEvent } from "../utils/structs";

const LOCAL_STORAGE_KEY = "dbJSON";

function initialRender() {
    const curDate = new Date();
    const threeDaysAhead = new Date();
    threeDaysAhead.setDate(curDate.getDate() + 3);

    todoData[0].items.push({
        "title":"Due Event",
        "description":"Due todo-example",
        "dueDate":curDate.toISOString().split("T")[0],
        "priority":"2",
        "completed":false,
        "notes":"Show how a due todo is formatted."
    });
    todoData[0].items.push({
        "title":"Complete Event",
        "description":"Complete todo-example",
        "dueDate":threeDaysAhead.toISOString().split("T")[0],
        "priority":"3",
        "completed":true,
        "notes":"Show how a complete todo is formatted."
    });
    const myJSON = JSON.stringify(todoData);
    localStorage.setItem(LOCAL_STORAGE_KEY, myJSON);
}

function refreshData(deactivate=false) {
    let checkText = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!checkText || checkText === null || checkText === undefined) {
        initialRender();
    };

    let text = localStorage.getItem(LOCAL_STORAGE_KEY);
    let savedData = JSON.parse(text);
    if (deactivate) {
        savedData.map((proj) => proj.active=false);
    };
    const projectList = savedData.map(proj => new projectItem(proj.title, proj.active, proj.items.map(listItem => new todoItem(listItem.title, listItem.description, new Date(listItem.dueDate), listItem.priority, listItem.completed, listItem.notes))));
    return projectList;
};

function refreshCalendarEvents() {
    let checkText = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!checkText || checkText === null || checkText === undefined) {
        initialRender();
    };

    let text = localStorage.getItem(LOCAL_STORAGE_KEY);
    let savedData = JSON.parse(text);
    const allEvents = [];
    savedData.forEach(proj => {
        if (proj.items.length > 0) {
            proj.items.forEach((listItem, idx) => {
                allEvents.push(new calendarEvent(`${proj}-${idx}`,listItem.title, listItem.dueDate, listItem.completed));
            })
        };
    });
    
    return JSON.parse(JSON.stringify(allEvents));
};

function writeData(update) {
    // Update the dueDate to String
    update.map((projKey) => {
        let items = projKey.items;
        if (items.length > 0) {
            items.map((item) => {
                if ("dueDate" in item) {
                    item.dueDate = item.dueDate.toISOString().split("T")[0];
                };
            });
        };
    });
    let text = JSON.stringify(update, null, 4);
    localStorage.setItem(LOCAL_STORAGE_KEY, text);
};

export { refreshData, writeData, refreshCalendarEvents }