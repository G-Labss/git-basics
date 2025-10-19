const locationInput = document.getElementById("locationInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const weekWeather = document.getElementById("weekWeather");
const weekWeatherTitle = document.getElementById("weekWeatherTitle");
const weekWeatherContainer = document.getElementById("weekWeatherContainer");

getWeatherBtn.addEventListener("click", async () => {
    const location = locationInput.value.trim();
    
    // Input validation
    if (!location) {
        weatherDisplay.innerHTML = `<p>Please enter a city name</p>`;
        weekWeather.innerHTML = "";
        return;
    }

    const key = "f30f8a7c50af2832bfbcab966c2b9f99";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${key}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${key}&units=metric`;

    // Display loading state
    weatherDisplay.innerHTML = `<p>Loading current weather...</p>`;
    weekWeather.innerHTML = `<p>Loading forecast...</p>`;

    try {
        // Fetch current weather
        const currentResponse = await fetch(currentWeatherUrl);
        if (!currentResponse.ok) {
            throw new Error(`Current weather API error: ${currentResponse.status}`);
        }
        const currentData = await currentResponse.json();

        // Display current weather
        const weatherText = currentData.weather[0].main;
        const weatherImg = currentData.weather[0].icon;
        const temp = Math.round(currentData.main.temp);
        const locationName = currentData.name;
        const country = currentData.sys.country;

        weatherDisplay.innerHTML = `
            <div class="current-weather">
                <h2>${weatherText} in ${locationName}, ${country}</h2>
                <img src="https://openweathermap.org/img/wn/${weatherImg}@2x.png" alt="${weatherText}" class="weather-icon">
                <h3>${temp}°C</h3>
                <p>Feels like: ${Math.round(currentData.main.feels_like)}°C</p>
                <p>Humidity: ${currentData.main.humidity}%</p>
            </div>
        `;

        // Fetch and display weekly forecast
        weekWeatherTitle.innerText = "4-Day Forecast";
        weekWeather.innerHTML = "";
        
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error(`Forecast API error: ${forecastResponse.status}`);
        }
        const forecastData = await forecastResponse.json();

        // Daily forecasts (every 24 hours)
        const dailyForecasts = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 4);
        
        dailyForecasts.forEach(forecast => {
            const weatherText = forecast.weather[0].main;
            const img = forecast.weather[0].icon;
            const temp = Math.round(forecast.main.temp);
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

            const listItem = document.createElement("li");
            listItem.className = "forecast-item";
            listItem.innerHTML = `
                <div>
                    <h3>${day}</h3>
                    <img src="https://openweathermap.org/img/wn/${img}.png" alt="${weatherText}">
                    <p>${weatherText}</p>
                    <p>${temp}°C</p>
                </div>
            `;
            weekWeather.appendChild(listItem);
        });

        weekWeatherContainer.style.padding = "25px";
        weekWeatherContainer.style.display = "block";

    } catch (error) {
        console.error('Error:', error);
        weatherDisplay.innerHTML = `<p>Error: Unable to fetch weather data for ${location}. Please check the city name and try again.</p>`;
        weekWeather.innerHTML = "";
        weekWeatherContainer.style.display = "none";
    }
});

// Add enter key support
locationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeatherBtn.click();
    }
});