import "bootstrap-icons/font/bootstrap-icons.css";
import { citySearch } from "./forms";
import { convertToAmPm, hideLoader, showLoader } from "./utils";

import wData from "./test.json";

let loadCss = false;

// Load the weather api from the environment variables using webpack plugin
const apiKey = process.env.VCWApiKey;

const weatherIcons = {
    "clear-day" : `<i class="fa-solid fa-sun"></i>`,
    "clear-night" : `<i class="fa-solid fa-cloud-moon"></i>`,
    "cloudy" : `<i class="fa-solid fa-cloud"></i>`,
    "fog" : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-fog-fill" viewBox="0 0 16 16">
                <path d="M3 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m10.405-9.473a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 12H13a3 3 0 0 0 .405-5.973"/>
             </svg>`,
    "hail" : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-hail-fill" viewBox="0 0 16 16">
                <path d="M3.75 15.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m.408-3.724a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316M7.75 15.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m.408-3.724a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m3.592 3.724a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m.408-3.724a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m1.247-6.999a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.5H13a3 3 0 0 0 .405-5.973"/>
              </svg>`,
    "partly-cloudy-day" : `<i class="fa-solid fa-cloud-sun"></i>`,
    "partly-cloudy-night" : `<i class="fa-solid fa-circle-half-stroke"></i>`,
    "rain-snow-showers-day" : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-snow-fill" viewBox="0 0 16 16">
                                <path d="M2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m2.75 2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-2.75-2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-.22-7.223a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973"/>
                               </svg>`,
    "rain-snow-showers-night" : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-snow-fill" viewBox="0 0 16 16">
                                <path d="M2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m2.75 2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-2.75-2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-.22-7.223a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973"/>
                               </svg>`,
    "rain-snow" : `<i class="fa-solid fa-cloud-meatball"></i>`,
    "rain" : `<i class="fa-solid fa-cloud-showers-heavy"></i>`,
    "showers-day" : `<i class="fa-solid fa-cloud-sun-rain"></i>`,
    "showers-night" : `<i class="fa-solid fa-cloud-moon-rain"></i>`,
    "sleet" : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-sleet-fill" viewBox="0 0 16 16">
                <path d="M2.375 13.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 1 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 1 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 0 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zM6.375 13.5a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 1 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 1 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 0 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zm2.151 2.447a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 1 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 1 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 1 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zm1.181-7.026a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973"/>
               </svg>`,
    "snow-showers-day" : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-snow-fill" viewBox="0 0 16 16">
                                <path d="M2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m2.75 2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-2.75-2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-.22-7.223a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973"/>
                               </svg>`,
    "snow-showers-night" : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-snow-fill" viewBox="0 0 16 16">
                                <path d="M2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m2.75 2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-2.75-2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-.22-7.223a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973"/>
                               </svg>`,
    "snow" : `<i class="bi bi-snow2"></i>`,
    "thunder-rain" : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-lightning-rain-fill" viewBox="0 0 16 16">
                        <path d="M2.658 11.026a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m-7.5 1.5a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m-7.105-1.25A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724zm6.352-7.249a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973"/>
                      </svg>`,
    "thunder-showers-day" : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-lightning-rain-fill" viewBox="0 0 16 16">
                                <path d="M2.658 11.026a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m-7.5 1.5a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m-7.105-1.25A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724zm6.352-7.249a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973"/>
                             </svg>`,
    "thunder-showers-night" : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-lightning-rain-fill" viewBox="0 0 16 16">
                                <path d="M2.658 11.026a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m-7.5 1.5a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m-7.105-1.25A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724zm6.352-7.249a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973"/>
                               </svg>`,
    "thunder" : `<i class="fa-solid fa-cloud-bolt"></i>`,
    "wind" : `<i class="fa-solid fa-wind"></i>`,
};

function updateCityName(cityName) {
    const activeCityDiv = document.querySelector(".active-city-name");
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    activeCityDiv.textContent = cityName;
}

function currWeatherLeftCntr(data, unit="us") {
    import("./css/weather.css");

    let windUnit;

    if (unit === "us") {
        windUnit = "mph";
    } else if (unit === "metric") {
        windUnit = "km/h";
    };

    const element = document.createElement("div");
    element.classList.add("current-conditions-left-cntr");

    let leftIcon =  document.createElement("div");
    let firstCondition = data["conditions"].toLowerCase();
    firstCondition = firstCondition.split(" ")[0];
    leftIcon.classList.add("current-weather-icon", data["icon"], firstCondition);
    leftIcon.innerHTML = weatherIcons[data["icon"]];

    let currTemp = document.createElement("div");
    currTemp.classList.add("current-temp-cntr");

    let tempValue = document.createElement("div");
    tempValue.classList.add("current-temp-value");
    tempValue.textContent = Math.round(data["temp"]);

    let tempUnits = document.createElement("div");
    tempUnits.classList.add("current-temp-units");
    let fahrLabel = document.createElement("button");
    fahrLabel.classList.add("fahrenheit-btn");
    fahrLabel.textContent = "°F";
    let labelSepr = document.createElement("span");
    labelSepr.classList.add("temp-sepr");
    let celsLabel = document.createElement("button");
    celsLabel.classList.add("celsius-btn");
    celsLabel.textContent = "°C";

    tempUnits.appendChild(fahrLabel);
    tempUnits.appendChild(labelSepr);
    tempUnits.appendChild(celsLabel);

    currTemp.appendChild(tempValue);
    currTemp.appendChild(tempUnits);

    let conditionCntr = document.createElement("div");
    conditionCntr.classList.add("current-weather-cond-pcts");
    let precipitation = document.createElement("div");
    precipitation.classList.add("current-precipitation","ccnd-text");
    precipitation.textContent = `Precipitation: ${data["precipprob"]}%`;
    let humidity = document.createElement("div");
    humidity.classList.add("current-humidity","ccnd-text");
    humidity.textContent = `Humidity: ${data["humidity"]}%`;
    let windSpeed = document.createElement("div");
    windSpeed.classList.add("current-windspeed","ccnd-text");
    windSpeed.textContent = `Wind Speed: ${data["windspeed"]} ${windUnit}`;
    let visibility = document.createElement("div");
    visibility.classList.add("current-visibility","ccnd-text");
    visibility.textContent = `Visibility: ${data["visibility"]}%`;

    conditionCntr.appendChild(precipitation);
    conditionCntr.appendChild(humidity);
    conditionCntr.appendChild(windSpeed);
    conditionCntr.appendChild(visibility);

    element.appendChild(leftIcon);
    element.appendChild(currTemp);
    element.appendChild(conditionCntr);

    return element;
}

function currWeatherRightCntr(data) {

    const element = document.createElement("div");
    element.classList.add("current-conditions-right-cntr");

    const weatherLabel = document.createElement("div");
    weatherLabel.classList.add("current-conditions-title");
    weatherLabel.textContent = "Weather";

    let dayNum = new Date(data["datetimeEpoch"]);
    dayNum = dayNum.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = dayNames[dayNum];
    let dayTime = convertToAmPm(data["datetime"]);

    const currentDay = document.createElement("div");
    currentDay.classList.add("current-conditions-date");
    currentDay.textContent = `${dayOfWeek}     ${dayTime}`;

    const condition = document.createElement("div");
    condition.classList.add("current-conditions-condition");
    condition.textContent = data["conditions"];

    element.appendChild(weatherLabel);
    element.appendChild(currentDay);
    element.appendChild(condition);

    return element;
}

function hourlyDataCard(data) {
    const element = document.createElement("div");
    element.classList.add("hourly-card-cntr");

    const hourTime = document.createElement("div");
    hourTime.classList.add("hourly-time");
    hourTime.textContent = convertToAmPm(data["datetime"], false);

    const hourIcon = document.createElement("div");
    let firstCondition = data["conditions"].toLowerCase();
    firstCondition = firstCondition.split(" ")[0];
    hourIcon.classList.add("hourly-icon", data["icon"], firstCondition);
    hourIcon.innerHTML = weatherIcons[data["icon"]];

    const hourTemp = document.createElement("div");
    hourTemp.classList.add("hourly-temp");
    hourTemp.textContent = `${Math.round(data["temp"])}°`;

    element.appendChild(hourTime);
    element.appendChild(hourIcon);
    element.appendChild(hourTemp);

    return element;
};

function scrollNavs(className) {
    let element = document.createElement("div");
    element.classList.add(className);

    let leftScroll = document.createElement("div");
    leftScroll.classList.add(`${className}-left`);
    leftScroll.innerHTML = `<i class="fa-solid fa-circle-left"></i>`;

    let rightScroll = document.createElement("div");
    rightScroll.classList.add(`${className}-right`);
    rightScroll.innerHTML = `<i class="fa-solid fa-circle-right"></i>`;

    element.appendChild(leftScroll);
    element.appendChild(rightScroll);
    
    return element;
}

function renderHourlyTempForToday(hourlyData) {
    const hrlyWeatherCntr = document.querySelector(".hourly-weather-cntr");
    hrlyWeatherCntr.innerHTML = "";

    let todayOutlook = hourlyData["description"];
    let hourlyCards = hourlyData["hours"];

    const title = document.createElement("div");
    title.classList.add("today-weather-summary");
    title.textContent = todayOutlook;

    const dailyCards = document.createElement("div");
    dailyCards.classList.add("today-weather-cards");

    hourlyCards.forEach(cardData => {
        let cardElem = hourlyDataCard(cardData);
        dailyCards.appendChild(cardElem);
    });

    const dailyNav = scrollNavs("today-weather-navs");

    hrlyWeatherCntr.appendChild(title);
    hrlyWeatherCntr.appendChild(dailyCards);
    hrlyWeatherCntr.appendChild(dailyNav);

    const scrollLeftBtn = document.querySelector(".today-weather-navs-left");
    const scrollRightBtn = document.querySelector(".today-weather-navs-right");
    const gridContent = document.querySelector(".today-weather-cards");

    scrollLeftBtn.addEventListener("click", () => {
        gridContent.scrollBy({ left: -200, behavior: "smooth" });
    });

    scrollRightBtn.addEventListener("click", () => {
        gridContent.scrollBy({ left: 200, behavior: "smooth" });
    });
};


function renderCurrWeather(currData, unit="us") {

    const currWeatherCntr = document.querySelector(".current-weather-cntr");
    currWeatherCntr.innerHTML = "";

    let leftCntr = currWeatherLeftCntr(currData, unit);
    let rightCntr = currWeatherRightCntr(currData);

    currWeatherCntr.appendChild(leftCntr);
    currWeatherCntr.appendChild(rightCntr);
};

function task1() {  
    return wData;
}

async function getCityWeather(city, unit="us") {
    try {
        showLoader();

        // unitGroup (optional) – The system of output data units. Supported values are us, uk, metric, base.
        let resp = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=${unit}&key=${apiKey}&contentType=json`, {
            mode: "cors"
        })
        resp = await resp.json();

        // Dummy implementation for testing
        // let resp = wData;
        // let resp = await new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(task1());
        //     }, 3000);
        // });

        updateCityName(resp["address"])
        renderCurrWeather(resp["currentConditions"], unit);
        renderHourlyTempForToday(resp["days"][0]);

        let fahrBtn = document.querySelector(".fahrenheit-btn");
        let celsBtn = document.querySelector(".celsius-btn");
        const activeCity = document.querySelector(".active-city-name");

        if (unit === "us") {
            fahrBtn.classList.remove("inactive-unit");
            celsBtn.classList.add("inactive-unit");
        } else if (unit === "metric") {
            fahrBtn.classList.add("inactive-unit");
            celsBtn.classList.remove("inactive-unit");
        };

        fahrBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let currCity = activeCity.textContent;
            getCityWeather(currCity, "us");
        });

        celsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let currCity = activeCity.textContent;
            getCityWeather(currCity, "metric");
        });

        console.log(resp);

        hideLoader();
        return resp;

    } catch (error) {
        alert(`${city} is not a valid city.`)
        console.log(error);
    }
}

function renderWeather() {
    loadCss = true;
    if (loadCss) {
        import("./css/main.css");
    };
    const element = document.createElement("div");
    element.classList.add("content-cntr");

    const activeCityName = document.createElement("div");
    activeCityName.classList.add("active-city-name");
    activeCityName.textContent = "London";

    const currWthrCntr = document.createElement("div");
    currWthrCntr.classList.add("current-weather-cntr");

    const progressBar = document.createElement("div");
    progressBar.classList.add("loader","hidden");

    const hourlyWthrCntr = document.createElement("div");
    hourlyWthrCntr.classList.add("hourly-weather-cntr");

    const documentation = document.createElement("div");
    documentation.textContent = "This is a simple async weather data api query";
    documentation.style.display = "flex";
    documentation.style.justifyContent = "center";

    let form = citySearch();
    element.appendChild(form);
    element.appendChild(progressBar);
    element.appendChild(activeCityName);
    element.appendChild(currWthrCntr);
    element.appendChild(hourlyWthrCntr);
    element.appendChild(documentation);

    loadCss = false;
    return element;
};


export { getCityWeather, renderWeather };

