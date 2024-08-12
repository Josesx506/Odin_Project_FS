let loadCss = false;

// Load the weather api from the environment variables using webpack plugin
const apiKey = process.env.VCWApiKey;

async function getCityWeather(city, unit="us") {
    try {
        // unitGroup (optional) – The system of output data units. Supported values are us, uk, metric, base.
        let resp = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&key=${apiKey}&contentType=json`, {
            mode: "cors"
        })
        resp = resp.json();
        
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
    element.appendChild(documentation);
    // getCityWeather("London").then(console.log);

    loadCss = false;
    return element;
};


export { renderWeather }