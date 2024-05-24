const addProjBtn = (function(){
    const btn = document.createElement("button");
    btn.classList.add("add-project","clickable-btn");
    btn.innerHTML = `<span>New Project <i class="fa-solid fa-folder-plus"></i></span>`;

    return btn;
}) ()

const addTodoBtn = (function(){
    const btn = document.createElement("button");
    btn.classList.add("add-todo","clickable-btn");
    btn.innerHTML = `<span>New Todo <i class="fa-solid fa-calendar-plus"></i></span>`;

    return btn;
}) ()

export {addProjBtn, addTodoBtn};