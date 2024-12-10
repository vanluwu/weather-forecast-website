# Weather Forecast Website

---

## **Project Overview**
The **Weather Forecast Website** is a visually appealing and interactive platform that provides real-time weather updates, a 24-hour forecast, and a 5-day forecast for any city entered by the user. With a sleek design featuring a video background and dynamically updating data, the website enhances user experience by combining functionality and aesthetics.

---

## **Key Features**
1. **Search Functionality**  
   - Users can enter the name of any city to fetch real-time weather data.

2. **Dynamic Video Background**  
   - An immersive video background enhances the visual appeal of the website.
![video background]()
3. **Current Weather Details**  
   - Displays:
     - Temperature
     - Weather description
     - Humidity
     - Feels-like temperature  
   - Weather icons dynamically change based on current conditions.

4. **24-Hour Weather Forecast**  
   - Hour-by-hour updates for the next 24 hours, including temperature and weather conditions.

5. **5-Day Weather Forecast**  
   - Displays daily forecasts for the next 5 days, including maximum and minimum temperatures.

6. **Detailed Weather Metrics**  
   - Additional metrics include:
     - Humidity
     - Cloudiness
     - Visibility
     - Wind speed
     - Air quality index (AQI)
     - Precipitation levels
   - Interactive weather maps for wind, pressure, precipitation, and temperature.

7. **Error Handling**  
   - Displays a user-friendly "Error 404" page if an invalid city is entered.

---

## **Project Progress (Week 10–14)**

### **Week 10: Initial Setup**
- Created the basic structure of the project with **HTML**, **CSS**, and **JavaScript** files.
- Implemented a responsive **search box** and styled it using CSS.
- Added a **video background** for visual enhancement.

### **Week 11: 24-Hour Forecast**
- Integrated the **OpenWeatherMap API** to fetch real-time weather data.
- Developed the **24-hour forecast** section:
  - Displayed hourly temperature and weather conditions.
  - Used a scrollable container to improve user experience.

### **Week 12: 5-Day Forecast**
- Extended API integration to include a **5-day weather forecast**:
  - Summarized data for each day with max and min temperatures.
  - Added weather icons for each day.
- Enhanced CSS for better layout and responsiveness.

### **Week 13: Weather Details**
- Implemented the **Weather Details** section with detailed metrics:
  - Feels-like temperature
  - Humidity
  - Cloudiness
  - Visibility
  - Wind speed
  - Air pollution (AQI)
  - Interactive weather maps for wind, pressure, precipitation, and temperature.
- Improved error handling for invalid city searches.

### **Week 14: Final Touches**
- Refined the **user interface** for better usability and design consistency.
- Tested functionality across different devices and screen sizes.
- Debugged issues related to API response handling and dynamic updates.

---

## **Technologies Used**
- **HTML5**: For creating the webpage structure.
- **CSS3**: For styling, responsive design, and animations.
- **JavaScript (ES6)**: For interactivity, API calls, and DOM manipulation.
- **OpenWeatherMap API**: To fetch:
  - Real-time weather data
  - 24-hour and 5-day forecasts
  - Air quality index
  - Interactive weather maps (wind, precipitation, temperature, and pressure).

---

## **How to Run**
1. **Pre-requisites**:
   - Internet connection for fetching API data.
   - Modern web browser (e.g., Google Chrome, Firefox).

2. **Steps**:
   - Place all project files (`HTML`, `CSS`, `JavaScript`) in the same directory.
   - Update the API key in the `weather-forecast-website.js` file with your OpenWeatherMap API key.
   - Open `weather-forecast-website.html` in your web browser.

---

## **Screenshots**

### **Homepage**
![Homepage Screenshot](https://via.placeholder.com/800x400.png?text=Homepage)

### **24-Hour Weather Forecast**
![24-Hour Forecast Screenshot](https://via.placeholder.com/800x400.png?text=24-Hour+Forecast)

### **5-Day Weather Forecast**
![5-Day Forecast Screenshot](https://via.placeholder.com/800x400.png?text=5-Day+Forecast)

### **Weather Details**
![Weather Details Screenshot](https://via.placeholder.com/800x400.png?text=Weather+Details)

### **Error Page**
![Error Page Screenshot](https://via.placeholder.com/800x400.png?text=Error+Page)

---

## **Known Issues**
- **Network Error Handling**: The site does not provide fallback data if the API is unreachable.
- **API Rate Limits**: Users may experience delays if the API's free tier limit is exceeded.

---

## **Future Enhancements**
1. Add **geolocation functionality** to automatically fetch the user's weather information.
2. Optimize the design for **smaller screens** to improve accessibility.
3. Improve **error messages** to be more user-friendly.

---

**Weather Forecast Website** – Your comprehensive weather companion!
