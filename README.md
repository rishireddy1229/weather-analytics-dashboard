# 🌦 Weather Analytics Dashboard

##  Overview

An interactive **weather analytics dashboard** that visualizes real-time and forecast weather data with dynamic UI adaptation and environmental animations.

This project goes beyond basic weather display by combining **data processing, multi-API integration, and responsive UI behavior**.

---

## Problem

Most weather apps simply display raw data without:

- Context-aware UI (day/night, weather-based)
- Visual analytics for trends
- Real-time environmental feedback

---

## Solution

Built a **data-driven weather dashboard** that:

- Fetches real-time + forecast weather data
- Dynamically adapts UI based on weather conditions
- Displays insights and trends using charts
- Adds immersive animations (rain, wind, etc.)

---

## Key Features

- Real-time weather data (temperature, humidity, wind)
- 5-day forecast visualization (Chart.js)
- Derived insights (average temperature)
- Air Quality Index (AQI) integration
- Day/Night adaptive UI (based on sunrise/sunset)
- Dynamic background (weather-based themes)
- Rain animation
- Wind animation
- Smooth transitions and responsive UI

---

##  Tech Stack

- **Frontend:** HTML, CSS, JavaScript (ES6 Modules)
- **Visualization:** Chart.js
- **APIs:**
  - OpenWeather Current API
  - OpenWeather Forecast API
  - OpenWeather Air Pollution API

---

##  Architecture

User Input → API Layer → Data Processing → UI Rendering

- `api.js` → Handles API calls
- `utils.js` → Processes forecast data
- `charts.js` → Renders visualizations
- `app.js` → Controls UI + logic + animations

---

##  How to Run

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
open index.html with live server

---

