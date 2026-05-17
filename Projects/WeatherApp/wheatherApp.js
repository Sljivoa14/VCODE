
// API Configuration
const API_KEY = '6d5f6205e43445c1a03141731261505';
const CURRENT_URL = 'https://api.weatherapi.com/v1/current.json';
//const FORECAST_URL = 'https://api.weatherapi.com/v1/forecast.json';

// DOM Elements
const weatherInfo = document.getElementById('weatherInfo');
const weatherInfo2 = document.getElementById('weatherInfo2');
const forecastInfo = document.getElementById('forecast');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingMsg = document.getElementById('loading');
const errorMsg = document.getElementById('error');

// Weather icon mapping
const weatherIcons = {
    'Sunny': '☀️',
    'Clear': '☀️',
    'Partly cloudy': '🌤',
    'Cloudy': '☁️',
    'Overcast': '☁️',
    'Light rain': '🌦',
    'Rain': '🌧',
    'Heavy rain': '🌧',
    'Thunderstorm': '⛈',
    'Snow': '❄️',
    'Mist': '🌫',
    'Fog': '🌫'
};

function displayWeather(data) {
    if(!weatherInfo){
        console.log("weatherInfo element not found");
        return;
    }

    const location = data.location.name;
    const tempC = data.current.temp_c;
    const tempF = data.current.temp_f;
    const condition = data.current.condition.text;
    const icon = weatherIcons[condition];    

    weatherInfo.innerHTML = `
        <h2>${location}</h2>
        <p>${icon} ${condition}</p>
        <p>Temperature: ${tempC}°C / ${tempF}°F</p>
    `;

    loadingMsg.style.display = 'none';
}

// Fetch Weather Data
async function  fetchWeather(city) {
        showLoading();

        if(weatherInfo === true){
            weatherInfo.innerHTML = '';
        }

        const response = await fetch(`${CURRENT_URL}?key=${API_KEY}&q=${city}`);
    
        /*if(!response.ok){
            throw new Error("Failed to fetch weather data");
        }*/

        const data = await response.json();

        console.log(data);
        displayWeather(data);

        return data;
}      

function showLoading() {
    loadingMsg.style.display = 'block';
    errorMsg.style.display = 'none';
}

function showError() {
    loadingMsg.style.display = 'none';
    errorMsg.style.display = 'block';
}

function cityEnter(event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
}

// Event Listener
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if(city){
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});