import "@fortawesome/fontawesome-free/js/all";
import "./css/index.css";

import { renderWeather } from "./weather";

const content = document.querySelector("#weatherContent");
const weatherHomeBtn = document.querySelector(".home");

function clearElement(element) {
    if (!element) return;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

function renderWeatherPage(pages) {
    if (!pages || !content) return;
    clearElement(content);
    content.appendChild(pages);
};

renderWeatherPage(renderWeather());

weatherHomeBtn.addEventListener("click", (e) => {
    renderWeatherPage(renderWeather());
});

// console.log(renderWeather());