import React from 'react';
function ForecastSection({ forecast }) {
 
    const groupedForecast = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
      if (!groupedForecast[date]) {
        groupedForecast[date] = [];
      }
      groupedForecast[date].push(item);
    });
    
    
    const dailyForecast = Object.keys(groupedForecast).slice(0, 5).map(day => {
      const dayData = groupedForecast[day];
      const temps = dayData.map(data => data.main.temp);
      const icons = dayData.map(data => data.weather[0].icon);
   
      const iconCounts = {};
      let maxCount = 0;
      let mainIcon = '';
      
      icons.forEach(icon => {
        iconCounts[icon] = (iconCounts[icon] || 0) + 1;
        if (iconCounts[icon] > maxCount) {
          maxCount = iconCounts[icon];
          mainIcon = icon;
        }
      });
      
      return {
        day,
        avgTemp: temps.reduce((sum, temp) => sum + temp, 0) / temps.length,
        icon: mainIcon,
        description: dayData.find(data => data.weather[0].icon === mainIcon)?.weather[0].description || ''
      };
    });
    
    return (
      <div className="forecast-section">
        <h3>5-Day Forecast</h3>
        <div className="forecast-items">
          {dailyForecast.map((day, index) => (
            <div className="forecast-item" key={index}>
              <h4>{day.day}</h4>
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.description}
              />
              <p className="forecast-temp">{Math.round(day.avgTemp)}°C</p>
              <p className="forecast-desc">{day.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default ForecastSection;