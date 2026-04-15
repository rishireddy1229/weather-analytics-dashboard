const API_KEY = "YOUR_API";


export async function fetchWeatherData(city) {
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const [currentRes, forecastRes] = await Promise.all([
        fetch(currentURL),
        fetch(forecastURL)
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
        throw new Error("City not found");
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    const { lat, lon } = currentData.coord;

    const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    const airData = await airRes.json();

    return { currentData, forecastData, airData };
}