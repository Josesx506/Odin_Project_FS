function addProjBtn(){
    const btn = document.createElement("button");
    btn.classList.add("add-project","clickable-btn");
    btn.innerHTML = `<span>New Project</span><i class="fa-solid fa-folder-plus"></i>`;

    return btn;
};

function addProjForm(){
    // 10:46 for checkboxes
    const element = document.createElement("div");
    element.classList.add("add-project","clickable-btn");

    const form = document.createElement("form");
    form.classList.add("new-project-form");
    
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-folder-plus");
    const input = document.createElement("input");
    input.setAttribute("type","text");
    input.classList.add("new-project-entry");
    input.id = "new-project-entry";
    input.setAttribute("name","new-project-entry");
    input.setAttribute("placeholder","create project");
    input.setAttribute("aria-label","create project");

    form.appendChild(input);

    element.appendChild(form);
    element.appendChild(icon);

    return element;
};

const addTodoBtn = (function(){
    const btn = document.createElement("button");
    btn.classList.add("add-todo","clickable-btn");
    btn.innerHTML = `<span>New Todo <i class="fa-solid fa-calendar-plus"></i></span>`;

    return btn;
}) ()

function deleteProjBtn(text,id) {
    const btn = document.createElement("div");
    btn.classList.add("project-item-cntr","clickable-btn");
    btn.innerHTML = `<span class="project-item-selector">${text}</span><button class="delete-project-btn"><i class="fa-solid fa-folder-minus"></i></button>`;
    btn.childNodes[1].dataset.id = id;

    return btn;
};

export {addProjBtn, addTodoBtn, addProjForm, deleteProjBtn};