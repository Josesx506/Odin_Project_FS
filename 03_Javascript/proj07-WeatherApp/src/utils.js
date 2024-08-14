
function convertToAmPm(timeStr, long=true) {
    // Convert datetime string to 12-hour format
    let [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight and 12 to 12 for noon

    if (long) {
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
    } else {
        return `${hours.toString().padStart(2, "0")}${ampm}`
    }
};

function showLoader() {
    const loader = document.querySelector(".loader");
    loader.classList.remove("hidden");
};

function hideLoader() {
    const loader = document.querySelector(".loader");
    loader.classList.add("hidden");
};

export { convertToAmPm, showLoader, hideLoader }
