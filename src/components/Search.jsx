import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/search?query=${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Cherchez des cours gratuits..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>

      <div className="results-grid">
        {results.map(site => (
          <div key={site.id} className="result-item">
            <h3>{site.name}</h3>
            <p>{site.description}</p>
            <a href={site.url} target="_blank" rel="noopener noreferrer">
              Visiter le site
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
