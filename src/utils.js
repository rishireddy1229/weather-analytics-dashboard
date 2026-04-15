export function processForecastData(data) {
    const temps = [];
    const humidity = [];
    const dates = [];

    for (let i = 0; i < data.list.length; i += 8) {
        const item = data.list[i];

        temps.push(item.main.temp || 0);
        humidity.push(item.main.humidity || 0);
        dates.push(item.dt_txt.split(" ")[0]);
    }

    return { temps, humidity, dates };
}