import { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import ForecastSection from './components/ForecastSection';
import RecentSearches from './components/RecentSearches';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  const API_KEY = '07839ec3610ea2602015fe1c005b48b7'; // Replace with your OpenWeatherMap API key
  
  useEffect(() => {
    // Load recent searches from localStorage on initial load
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);
  
  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Save theme preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error(
          weatherResponse.status === 404
            ? 'City not found. Please check the spelling and try again.'
            : 'Failed to fetch weather data. Please try again later.'
        );
      }
      
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data.');
      }
      
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
      
      // Update recent searches
      updateRecentSearches(cityName);
      
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };
  
  const updateRecentSearches = (cityName) => {
    const capitalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    
    // Add to recent searches (avoid duplicates)
    setRecentSearches(prevSearches => {
      const newSearches = prevSearches.filter(s => s.toLowerCase() !== cityName.toLowerCase());
      const updatedSearches = [capitalizedCity, ...newSearches].slice(0, 5);
      
      // Save to localStorage
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
      return updatedSearches;
    });
  };
  
  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeather(searchCity);
  };
  
  const handleRecentSearchClick = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };
  
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };
  
  const handleRefresh = () => {
    fetchWeather(city);
  };
  
  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <h1>Weather Dashboard</h1>
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      </header>
      
      <main>
        <SearchForm onSearch={handleSearch} />
        
        {recentSearches.length > 0 && (
          <RecentSearches searches={recentSearches} onSearchClick={handleRecentSearchClick} />
        )}
        
        {loading && <Loader />}
        
        {error && <ErrorMessage message={error} />}
        
        {weather && !loading && !error && (
          <>
            <WeatherCard weather={weather} onRefresh={handleRefresh} />
            {forecast && <ForecastSection forecast={forecast} />}
          </>
        )}
      </main>
      
      <footer>
        <p>Weather Dashboard App - Hritika Sharan</p>
      </footer>
    </div>
  );
}

export default App;