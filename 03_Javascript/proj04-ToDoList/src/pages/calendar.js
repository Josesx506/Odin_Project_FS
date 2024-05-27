import { Calendar } from "fullcalendar";
import { refreshCalendarEvents } from "../utils/crud";

let loadCalendarCss = false;

const renderCalendar = function(element) {
    loadCalendarCss = true;
    if (loadCalendarCss) {
        import("../css/calendar.css");
    }

    element.classList.add("calendar-content-cntr");

    const calEvents = refreshCalendarEvents();

    const calendar = new Calendar(element, {
        initialView: "dayGridMonth",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        events: calEvents
    });
    calendar.setOption('aspectRatio', 1.2);
    calendar.render();
};

export {renderCalendar};