import React from 'react';
function RecentSearches({ searches, onSearchClick }) {
  return (
    <div className="recent-searches">

      <h3>Recent Searches</h3>


      <div className="searches-list">
        {searches.map((cityName, index) => (
          <button 
            key={index} 
            className="city-button"
            onClick={() => onSearchClick(cityName)}
          >
            {cityName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;
