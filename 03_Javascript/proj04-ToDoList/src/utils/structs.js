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

function getDueTodos(date,cutoff=1) {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    now = now.getTime();

    const todoDate = new Date(date);
    todoDate.setHours(0, 0, 0, 0);
    const timestamp = todoDate.getTime();

    if (timestamp > now) {
        return false;
    } else {    
        // Convert milliseconds to days
        const dailyMs = 1000 * 60 * 60 * 24;
        const differenceInDays = Math.round((now - timestamp) / dailyMs);

        // Return the absolute difference
        return (differenceInDays <= cutoff);
    };
};

export { projectItem, todoItem, getDueTodos };