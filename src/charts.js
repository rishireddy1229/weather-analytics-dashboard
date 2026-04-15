let charts = [];

export function renderCharts({ temps, humidity, dates }) {

    charts.forEach(c => c.destroy());
    charts = [];

    const ctx1 = document.getElementById("tempChart");
    const ctx2 = document.getElementById("humidityChart");

    const combinedChart = new Chart(ctx1, {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                {
                    label: "Temperature (°C)",
                    data: temps,
                    tension: 0.3,
                    yAxisID: "y"
                },
                {
                    label: "Humidity (%)",
                    data: humidity,
                    type: "bar",
                    yAxisID: "y1"
                }
            ]
        },
        options: {
            scales: {
                y: { position: "left" },
                y1: {
                    position: "right",
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });

    const humidityChart = new Chart(ctx2, {
        type: "bar",
        data: {
            labels: dates,
            datasets: [{
                label: "Humidity (%)",
                data: humidity
            }]
        }
    });

    charts.push(combinedChart, humidityChart);
}