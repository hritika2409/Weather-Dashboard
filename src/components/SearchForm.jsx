import { useState } from 'react';

function SearchForm({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };
  
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter city name"
        aria-label="City name"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;