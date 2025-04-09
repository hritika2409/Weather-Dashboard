import React from 'react';
function ThemeToggle({ darkMode, toggleTheme }) {
    return (
      <button 
        className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    );
  }
  
  export default ThemeToggle;