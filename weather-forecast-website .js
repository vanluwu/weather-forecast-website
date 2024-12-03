const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const hourlyForecast = document.querySelector('.hourly-forecast');
const fiveDayForecast = document.querySelector('.five-day-forecast');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

function fetchHourlyForecast(city) {
    const APIKey = '5bd89646c870f9448fb8dc8539d991c6';
    const hourlyContainer = document.getElementById('hourly-forecast-container');
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== "200") {
                console.error("Error fetching hourly forecast:", data.message);
                return;
            }
           
            hourlyContainer.innerHTML = "";
            hourlyContainer.classList.add('active');

            data.list.slice(0, 8).forEach((forecast) => {
                const time = new Date(forecast.dt * 1000);
                const hour = time.getHours().toString().padStart(2, "0") + ":00";
                const temp = Math.round(forecast.main.temp) + "°C";
                const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

                const hourElement = document.createElement("div");
                hourElement.className = "hour";
                hourElement.innerHTML = `
                    <p>${hour}</p>
                    <img src="${icon}" alt="${forecast.weather[0].description}">
                    <p>${temp}</p>
                `;
                hourlyContainer.appendChild(hourElement);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

function fetchFiveDayForecast(lat, lon) {
    const APIKey = '5bd89646c870f9448fb8dc8539d991c6';
    const fiveDayContainer = document.getElementById('five-day-container');

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== "200") {
                console.error("Error fetching 5-day forecast:", data.message);
                return;
            }

            fiveDayContainer.innerHTML = "";

            const dailyForecasts = {};
            data.list.forEach((forecast) => {
                const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US");
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = [];
                }
                dailyForecasts[date].push(forecast.main.temp);
            });

            Object.keys(dailyForecasts).slice(0, 5).forEach((date) => {
                const temps = dailyForecasts[date];
                const tempMax = Math.round(Math.max(...temps)) + "°C";
                const tempMin = Math.round(Math.min(...temps)) + "°C";

                const forecast = data.list.find((f) => 
                    new Date(f.dt * 1000).toLocaleDateString("en-US") === date
                );
                const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
                const dayName = new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });

                const dayElement = document.createElement("div");
                dayElement.className = "day";
                dayElement.innerHTML = `
                    <p>${dayName}</p>
                    <img src="${icon}" alt="${forecast.weather[0].description}">
                    <p>${tempMax} / ${tempMin}</p>
                `;
                fiveDayContainer.appendChild(dayElement);
            });
        })
        .catch(error => console.error("Error fetching 5-day forecast data:", error));
}

search.addEventListener('click', () =>{

    const APIKey = '5bd89646c870f9448fb8dc8539d991c6';
    const city = document.querySelector('.search-box input').value;

    if (city ==='')
        return;
    
        
     
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{
        if(json.cod == '404'){
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            hourlyForecast.classList.remove('active');
            fiveDayForecast.classList.remove('active')
            error404.classList.add('active');
            return;
        }
       
        const lat = json.coord.lat;
        const lon = json.coord.lon;

        fetchFiveDayForecast(lat, lon); 
        fetchHourlyForecast(city);
        
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('#humidity'); 
    const feelsLike = document.querySelector('#feels-like')
    const pressure = document.querySelector('#pressure');
    const windSpeed = document.querySelector('#wind-speed');
    const cloudiness = document.querySelector('#cloudiness');
    const visibility = document.querySelector('#visibility');
    const precipitation = document.querySelector('#precipitation');
    

    if (cityHide.textContent == city){
        return;
    }
    else {
        cityHide.textContent = city;

        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
            container.classList.remove('active');
        }, 2500)

        const icon = json.weather[0].icon;
        image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        feelsLike.innerHTML = `${Math.round(json.main.feels_like)}°C`;
        pressure.innerHTML = `${json.main.pressure} hPa`;
        windSpeed.innerHTML = `${parseInt(json.wind.speed)} m/s`;
        cloudiness.innerHTML = `${json.clouds.all}%`;
        visibility.innerHTML = `${(json.visibility / 1000)} km`;
        precipitation.innerHTML = json.rain ? `${json.rain["1h"]} mm` : "0 mm";
        
        
  
    }

    });

});