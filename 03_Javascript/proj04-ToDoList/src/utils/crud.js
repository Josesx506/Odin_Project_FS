import todoData from "../db.json";
import { projectItem, todoItem } from "../utils/structs";

const LOCAL_STORAGE_KEY = "dbJSON";

function initialRender() {
    const myJSON = JSON.stringify(todoData);
    localStorage.setItem(LOCAL_STORAGE_KEY, myJSON);
}

function refreshData() {
    let checkText = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (checkText === "null") {
        initialRender();
    };

    let text = localStorage.getItem(LOCAL_STORAGE_KEY);
    let savedData = JSON.parse(text);
    const projectList = savedData.map(proj => new projectItem(proj.title, proj.active, proj.items.map(listItem => new todoItem(listItem.title, listItem.description, new Date(listItem.dueDate), listItem.priority, listItem.completed, listItem.notes))));
    return projectList;
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

export { refreshData, writeData }