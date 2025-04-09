# Weather Dashboard App

A responsive Weather Dashboard web application built with React that allows users to search for any city and view its current weather information and 5-day forecast.

## 🚀 Live Demo

[View the live app](https://weather-dashboard-three-beige.vercel.app/)

## ✨ Features

- Search for weather information by city name
- View detailed current weather conditions:
  - Temperature in Celsius
  - Weather condition with icon
  - Humidity percentage
  - Wind speed in km/h
  - Feels like temperature
  - Pressure
- 5-Day weather forecast
- Recent search history (last 5 searched cities)
- Dark/Light theme toggle
- Responsive design for all device sizes
- Loading indicators and error handling

## 🛠 Tech Stack

- *Framework*: React.js (built with Vite)
- *State Management*: React Hooks (useState, useEffect)
- *Styling*: CSS (custom styling, no UI libraries)
- *API*: OpenWeatherMap API
- *Deployment*: Vercel

## 📋 Setup Instructions

1. Clone the repository:
   bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   

2. Install dependencies:
   bash
   npm install
   

3. Create a .env file in the root directory and add your OpenWeatherMap API key:
   
   VITE_WEATHER_API_KEY=your_api_key_here
   

4. Start the development server:
   bash
   npm run dev
   

5. Build for production:
   bash
   npm run build
   

## 🔌 API Integration Details

This app uses the OpenWeatherMap API to fetch weather data:

- Current Weather API: https://api.openweathermap.org/data/2.5/weather
- 5-Day Forecast API: https://api.openweathermap.org/data/2.5/forecast

### Important API Notes:

- Free tier API key has a limit of 60 calls/minute or 1,000,000 calls/month
- All temperatures are fetched and displayed in Celsius units
- API response includes weather icons which are displayed in the UI
- Wind speed is converted from m/s to km/h for better readability

## 🧪 Project Structure

/src
├── /components
│   ├── ErrorMessage.jsx
│   ├── ForecastSection.jsx
│   ├── Loader.jsx
│   ├── RecentSearches.jsx
│   ├── SearchForm.jsx
│   ├── ThemeToggle.jsx
│   └── WeatherCard.jsx
├── App.jsx
├── App.css
├── main.jsx
└── index.css



