class projectItem{
    constructor (title,active,items) {
        this.title = title;
        this.active = active;
        this.items = items;
    }
};

class todoItem{
    constructor (title,description,dueDate,priority,completed,notes) {
        this.title = title;
        this.description  = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.notes = notes;
    }
}

export {projectItem, todoItem};