import "bootstrap-icons/font/bootstrap-icons.css";
import { citySearch } from "./forms";

let loadCss = false;

// Load the weather api from the environment variables using webpack plugin
const apiKey = process.env.VCWApiKey;

const weatherIcons = {
    "clear-day" : `<i class="fa-solid fa-sun"></i>`,
    "clear-night" : `<i class="fa-solid fa-moon"></i>`,
    "cloudy" : `<i class="fa-solid fa-cloud"></i>`,
    "fog" : `<i class="bi bi-cloud-fog-fill"></i>`,
    "hail" : `<i class="bi bi-cloud-hail"></i>`,
    "partly-cloudy-day" : `<i class="fa-solid fa-cloud-sun"></i>`,
    "partly-cloudy-night" : `<i class="fa-solid fa-cloud-moon"></i>`,
    "rain-snow-showers-day" : `<i class="bi bi-cloud-snow-fill"></i>`,
    "rain-snow-showers-night" : `<i class="bi bi-cloud-snow-fill"></i>`,
    "rain-snow" : `<i class="fa-solid fa-cloud-meatball"></i>`,
    "rain" : `<i class="fa-solid fa-cloud-showers-heavy"></i>`,
    "showers-day" : `<i class="fa-solid fa-cloud-sun-rain"></i>`,
    "showers-night" : `<i class="fa-solid fa-cloud-moon-rain"></i>`,
    "sleet" : `<i class="bi bi-cloud-sleet-fill"></i>`,
    "snow-showers-day" : `<i class="bi bi-cloud-snow-fill"></i>`,
    "snow-showers-night" : `<i class="bi bi-cloud-snow-fill"></i>`,
    "snow" : `<i class="bi bi-snow2"></i>`,
    "thunder-rain" : `<i class="bi bi-cloud-lightning-rain-fill"></i>`,
    "thunder-showers-day" : `<i class="bi bi-cloud-lightning-rain-fill"></i>`,
    "thunder-showers-night" : `<i class="bi bi-cloud-lightning-rain-fill"></i>`,
    "thunder" : `<i class="fa-solid fa-cloud-bolt"></i>`,
    "wind" : `<i class="fa-solid fa-wind"></i>`,
};

function currWeatherLeftCntr(data) {
    let dayNum = new Date(data["datetimeEpoch"]);
    dayNum = dayNum.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = dayNames[dayNum];

    const element = document.createElement("div");
    element.classList.add("current-conditions-left-cntr");

    let leftIcon =  document.createElement("div");
    leftIcon.classList.add("current-weather-icon");
    leftIcon.classList.add(data["icon"]);
    leftIcon.innerHTML = weatherIcons[data["icon"]];

    let tempValue =  document.createElement("div");
    tempValue.classList.add("current-temp-value");
    tempValue.textContent = data["temp"];

    let tempLabels = document.createElement("div");
    let fahrLabel = document.createElement("button");
    fahrLabel.textContent = "°F";
    let labelSepr = document.createElement("span");
    labelSepr.classList.add("temp-sepr");
    let celsLabel = document.createElement("button");
    celsLabel.textContent = "°C";

    tempLabels.appendChild(fahrLabel);
    tempLabels.appendChild(labelSepr);
    tempLabels.appendChild(celsLabel);

    let conditionValues = document.createElement("div");
    conditionValues.classList.add("current-weather-cond-pcts");
    let precipitation = document.createElement("div");
    precipitation.classList.add("current-precipitation","ccnd-text");
    precipitation.textContent = `Precipitation: ${data["precipprob"]}%`;
    let humidity = document.createElement("div");
    humidity.classList.add("current-humidity","ccnd-text");
    humidity.textContent = `Humidity: ${data["humidity"]}%`;
    let windSpeed = document.createElement("div");
    windSpeed.classList.add("current-windspeed","ccnd-text");
    windSpeed.textContent = `Wind Speed: ${data["windspeed"]} mph`;
    let visibility = document.createElement("div");
    visibility.classList.add("current-visibility","ccnd-text");
    visibility.textContent = `Visibility: ${data["visibility"]}%`;

    conditionValues.appendChild(precipitation);
    conditionValues.appendChild(humidity);
    conditionValues.appendChild(windSpeed);
    conditionValues.appendChild(visibility);

    element.appendChild(leftIcon);
    element.appendChild(tempValue);
    element.appendChild(tempLabels);
    element.appendChild(conditionValues);

    return element;
}



function renderCurrWeather(currData) {

    let leftCntr = currWeatherLeftCntr(currData);
};

async function getCityWeather(city, unit="us") {
    try {
        // unitGroup (optional) – The system of output data units. Supported values are us, uk, metric, base.
        let resp = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=${unit}&key=${apiKey}&contentType=json`, {
            mode: "cors"
        })
        resp = resp.json();
        
        return resp;

    } catch (error) {
        console.log(error);
    }
}

function renderWeather() {
    loadCss = true;
    if (loadCss) {
        import("./css/weather.css");
    };
    const element = document.createElement("div");
    element.classList.add("content-cntr");

    const documentation = document.createElement("div");
    documentation.textContent = "This is the weather";

    let form = citySearch();
    element.appendChild(form);
    // getCityWeather("London").then(console.log);

    loadCss = false;
    return element;
};


export { renderWeather };
