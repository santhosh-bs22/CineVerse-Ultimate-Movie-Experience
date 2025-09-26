import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleRandomSearch = () => {
    const tamilKeywords = ['Vikram', 'Master', 'Jai Bhim', 'Kaithi', 'Asuran', 'PS-1'];
    const randomKeyword = tamilKeywords[Math.floor(Math.random() * tamilKeywords.length)];
    setQuery(randomKeyword);
    onSearch(randomKeyword);
  };

  return (
    <section className="search-section">
      <div className="container">
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Search Tamil movies... (e.g., Vikram, Master, PS-1)"
              className="search-input"
              disabled={loading}
            />
            
            <div className="search-buttons">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? '⏳ Searching...' : '🔍 Search'}
              </button>
              
              <button
                type="button"
                onClick={handleRandomSearch}
                disabled={loading}
                className="btn btn-outline"
              >
                🎲 Random Movie
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  onSearch('');
                }}
                disabled={loading}
                className="btn btn-outline"
              >
                🎬 All Movies
              </button>
            </div>
          </form>
          
          <div className="search-suggestions">
            <p>Popular: Vikram, Master, PS-1, Jai Bhim, Kaithi, Asuran</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .search-suggestions {
          text-align: center;
          margin-top: 1rem;
          color: var(--text-gray);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .search-buttons {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default SearchBar;