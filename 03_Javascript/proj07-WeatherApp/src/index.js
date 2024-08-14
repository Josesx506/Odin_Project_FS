import "@fortawesome/fontawesome-free/js/all";
import "./css/index.css";

import { renderWeather, getCityWeather } from "./weather";

const content = document.querySelector("#weatherContent");
const weatherHomeBtn = document.querySelector(".home");

function dynamicEventListeners() {
    const form = document.querySelector(".search-form-body form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let formInput = form.querySelector("#search-city-input");
        let searchCity = formInput.value;
        getCityWeather(searchCity);
        form.reset();
    });
};

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
    getCityWeather("London");
    dynamicEventListeners();
};

renderWeatherPage(renderWeather());

weatherHomeBtn.addEventListener("click", (e) => {
    renderWeatherPage(renderWeather());
});