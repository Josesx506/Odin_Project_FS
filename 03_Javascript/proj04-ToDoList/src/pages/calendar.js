const renderCalendar = function() {
    const element = document.createElement("div");
    element.classList.add("content-cntr");
    element.textContent = "This is the calendar";

    return element;
};

export {renderCalendar};