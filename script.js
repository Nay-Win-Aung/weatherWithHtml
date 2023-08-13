document.getElementById("getWeatherButton").addEventListener("click", function() {
    const apiKey = "033e9a1195103e6401c41f280648ecb0"; // Replace with your API key
    const city = document.getElementById("cityInput").value;
    getWeather(city, apiKey)
        .then(data => {
            document.getElementById("weatherOutput").innerHTML = `Weather in ${city}: ${data.temp}°C, ${data.condition}`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById("weatherOutput").innerHTML = "Error fetching weather data.";
        });
});

async function getWeather(city, apiKey) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const weatherData = await response.json();
    
    if (weatherData.cod !== 200) {
        throw new Error(weatherData.message);
    }

    const temp = weatherData.main.temp;
    const condition = weatherData.weather[0].description;
    return { temp, condition };
}
