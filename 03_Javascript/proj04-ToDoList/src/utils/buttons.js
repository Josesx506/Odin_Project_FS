// function addProjBtn(){
//     const btn = document.createElement("button");
//     btn.classList.add("add-project","clickable-btn");
//     btn.innerHTML = `<span>New Project</span><i class="fa-solid fa-folder-plus"></i>`;

//     return btn;
// };
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

export { addTodoBtn, deleteProjBtn};