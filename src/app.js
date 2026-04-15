import { fetchWeatherData } from "./api.js";
import { processForecastData } from "./utils.js";
import { renderCharts } from "./charts.js";

//  Day/Night detection
function isNight(data) {
    return data.dt < data.sys.sunrise || data.dt > data.sys.sunset;
}

//  Background
function updateBackground(weather, night) {
    const body = document.body;
    body.classList.remove("dark-mode");

    if (night) {
        body.classList.add("dark-mode");
    }

    // Weather-based colors
    if (night) {
        body.style.background = "linear-gradient(135deg,#020617,#0f172a)";
    } else {
        switch (weather) {
            case "Clear":
                body.style.background = "linear-gradient(135deg,#fde68a,#f59e0b)";
                break;
            case "Clouds":
                body.style.background = "linear-gradient(135deg,#cbd5f5,#94a3b8)";
                break;
            case "Rain":
                body.style.background = "linear-gradient(135deg,#64748b,#334155)";
                break;
            default:
                body.style.background = "#f8fafc";
        }
    }
}

// 🌧 Effects
function clearEffects() {
    document.getElementById("weatherEffects").innerHTML = "";
}

function createRain() {
    const container = document.getElementById("weatherEffects");

    for (let i = 0; i < 80; i++) {
        const drop = document.createElement("div");
        drop.className = "rain-drop";
        drop.style.left = Math.random() * 100 + "vw";
        drop.style.animationDuration = (0.5 + Math.random()) + "s";
        container.appendChild(drop);
    }
}

function createWind() {
    const container = document.getElementById("weatherEffects");

    for (let i = 0; i < 30; i++) {
        const line = document.createElement("div");
        line.className = "wind-line";
        line.style.top = Math.random() * 100 + "vh";
        line.style.animationDuration = (1 + Math.random()) + "s";
        container.appendChild(line);
    }
}

async function getWeather() {
    const city = document.getElementById("city").value;
    const cards = document.getElementById("cards");

    //  Loader
    cards.innerHTML = `<div class="card">⏳ Loading...</div>`;

    try {
        const { currentData, forecastData, airData } = await fetchWeatherData(city);

        const weather = currentData.weather[0].main;
        const night = isNight(currentData);

        //  Background
        updateBackground(weather, night);

        //  Effects
        clearEffects();
        if (weather === "Rain" || weather === "Drizzle") createRain();
        if (weather === "Wind") createWind();

        // Process forecast
        const processed = processForecastData(forecastData);

        // Insights
        const avgTemp = (
            processed.temps.reduce((a, b) => a + b, 0) / processed.temps.length
        ).toFixed(1);

        const aqi = airData.list[0].main.aqi;

        //  FULL CARDS 
        cards.innerHTML = `
            <div class="card"><h3>🌡 Temp</h3><p>${currentData.main.temp}°C</p></div>
            <div class="card"><h3>💧 Humidity</h3><p>${currentData.main.humidity}%</p></div>
            <div class="card"><h3>🌬 Wind</h3><p>${currentData.wind.speed} m/s</p></div>
            <div class="card"><h3>📍 Country</h3><p>${currentData.sys.country}</p></div>
            <div class="card"><h3>📊 Avg Temp</h3><p>${avgTemp}°C</p></div>
            <div class="card"><h3>🌫 AQI</h3><p>${aqi}</p></div>
        `;

        // 📈 Charts
        renderCharts(processed);

    } catch (err) {
        cards.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}

document.getElementById("searchBtn").addEventListener("click", getWeather);