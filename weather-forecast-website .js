const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const sevenDayForecast = document.querySelector('.seven-day-forecast');
const hourlyForecast = document.querySelector('.hourly-forecast');

search.addEventListener('click', () =>{

    const APIKey = '5bd89646c870f9448fb8dc8539d991c6';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;
     
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{
        if(json.cod == '404'){
            cityHide.textContent = city;
            container.style.height = '400px';
             weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }
        
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span'); 
    const wind = document.querySelector('.weather-details .wind span');

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

        switch (json.weather[0].main){
            case 'Clear':
                image.src = '/Users/vanluu/Downloads/Emoji thời tiết/quang mây.png';
                break; 
            case 'Drizzle':
                image.src = '/Users/vanluu/Downloads/Emoji thời tiết/mưa phùn.png';
                break;
            case 'Clouds':
                image.src = '/Users/vanluu/Downloads/Emoji thời tiết/có mây.png';
                break;
            case 'Snow':
                image.src = '/Users/vanluu/Downloads/Emoji thời tiết/tuyết.png';
                break;
            case 'Fog':
                image.src = '/Users/vanluu/Downloads/Emoji thời tiết/sương mù.png';
                break;
            case 'Light fog':
                image.src = '/Users/vanluu/Downloads/Emoji thời tiết/sương mù nhẹ.png';
                break;
            case 'Rain':
                image.src = '/Users/vanluu/Downloads/Emoji thời tiết/mưa.png';
                break;
            case 'Heavy rain':
                image.src = '/Users/vanluu/Downloads/Emoji thời tiết/mưa lớn.png';
                break;
            default:
                image.src = '/Users/vanluu/Downloads/Emoji thời tiết/mây nắng.png';
        }
    
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`; 

        // Hiển thị dự báo 24 giờ
        const hourlyContainer = document.querySelector('.hourly-forecast');
        data.hourly.slice(0, 24).forEach(hour => {
            const hourlyItem = document.createElement('div');
            hourlyItem.classList.add('forecast-item');

            const weatherIcon = `http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`;
            const hourDate = new Date(hour.dt * 1000);
            const hours = hourDate.getHours();
            const minutes = hourDate.getMinutes().toString().padStart(2, '0');

            hourlyItem.innerHTML = `
                <img src="${weatherIcon}" alt="${hour.weather[0].description}">
                <p class="time">${hours}:${minutes}</p>
                <p class="temperature">${hour.temp}°C</p>
                <p class="wind">Gió: ${hour.wind_speed} km/h</p>
                <p class="humidity">Độ ẩm: ${hour.humidity}%</p>
            `;
        
            hourlyContainer.appendChild(hourlyItem);
        });
            // Hiển thị dự báo 7 ngày
        const sevenDayContainer = document.querySelector('.seven-day-forecast');
        data.daily.slice(0, 7).forEach(day => {
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
        
            const weatherIcon = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
            const dayDate = new Date(day.dt * 1000);
            const dayName = dayDate.toLocaleDateString('vi-VN', { weekday: 'short' });

            forecastItem.innerHTML = `
                <img src="${weatherIcon}" alt="${day.weather[0].description}">
                <p class="day">${dayName}</p>
                <p class="temperature">${day.temp.day}°C</p>
                <p class="wind">Gió: ${day.wind_speed} km/h</p>
                <p class="humidity">Độ ẩm: ${day.humidity}%</p>
            `;
        
            sevenDayContainer.appendChild(forecastItem);
        });

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = 'clone-info-weather';
        elCloneInfoWeather.classList.add('active-clone');

        elCloneInfoHumidity.id = 'clone-info-humidity';
        elCloneInfoHumidity.classList.add('active-clone');

        elCloneInfoWind.id = 'clone-info-wind';
        elCloneInfoWind.classList.add('active-clone');
        setTimeout(() => {
            infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
            infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
            infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
            cloneInfoWeatherFirst.classList.remove('active-clone');
            cloneInfoHumidityFirst.classList.remove('active-clone');
            cloneInfoWindFirst.classList.remove('active-clone');

            setTimeout (() => {
                cloneInfoWeatherFirst.remove();
                cloneInfoHumidityFirst.remove();
                cloneInfoWindFirst.remove();
            },2200);
        }

    }

    });

});