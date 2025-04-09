import React from 'react';
function WeatherCard({ weather, onRefresh }) {
    const { name, main, weather: weatherDetails, wind, sys } = weather;
    
    return (
      <div className="weather-card">
        <div className="weather-header">
          <h2>{name}, {sys.country}</h2>
          <button className="refresh-button" onClick={onRefresh} aria-label="Refresh">
            ↻
          </button>
        </div>
        
        <div className="weather-main">
          <div className="weather-icon">
            <img 
              src={`https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`}
              alt={weatherDetails[0].description}
            />
          </div>
          <div className="temperature">
            <span className="temp-value">{Math.round(main.temp)}</span>
            <span className="temp-unit">°C</span>
          </div>
        </div>
        
        <div className="weather-description">
          <p>{weatherDetails[0].description}</p>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Feels like:</span>
            <span className="detail-value">{Math.round(main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity:</span>
            <span className="detail-value">{main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind:</span>
            <span className="detail-value">{(wind.speed * 3.6).toFixed(1)} km/h</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pressure:</span>
            <span className="detail-value">{main.pressure} hPa</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default WeatherCard;