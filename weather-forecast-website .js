const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const hourlyForecast = document.querySelector('.hourly-forecast');
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
            // Xóa dữ liệu cũ
            hourlyContainer.innerHTML = "";
            hourlyContainer.classList.add('active');


            // Lấy 8 dự báo đầu tiên (3 giờ/lần => 24 giờ)
            data.list.slice(0, 8).forEach((forecast) => {
                const time = new Date(forecast.dt * 1000);
                const hour = time.getHours().toString().padStart(2, "0") + ":00";
                const temp = Math.round(forecast.main.temp) + "°C";
                const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

                // Tạo phần tử HTML cho từng giờ
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

search.addEventListener('click', () =>{

    const APIKey = '5bd89646c870f9448fb8dc8539d991c6';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
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
        fetchHourlyForecast(city);
        
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