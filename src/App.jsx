// src/App.jsx

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import TrailerModal from './components/TrailerModal';
import Particles from './components/Particles';
import { searchMovies } from './services/movieAPI';
import { tamilMovies, englishMovies, teluguMovies, upcomingMovies, allMovies } from './data/moviesData';
import './styles/App.css';

// HELPER: Function to check for valid poster
const isPosterValid = (movie) =>
  movie.Poster &&
  !movie.Poster.includes('placeholder') &&
  !movie.Poster.includes('No+Poster');

function App() {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerMovie, setTrailerMovie] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('trending'); // Default to trending
  const [activeLanguage, setActiveLanguage] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const mainContentRef = useRef(null);

  const filteredAllMovies = useMemo(() => {
    return allMovies.filter(movie => movie && movie.imdbID && isPosterValid(movie));
  }, []);

  const filteredTamilMovies = useMemo(() => tamilMovies.filter(isPosterValid), []);
  const filteredEnglishMovies = useMemo(() => englishMovies.filter(isPosterValid), []);
  const filteredTeluguMovies = useMemo(() => teluguMovies.filter(isPosterValid), []);
  const filteredUpcomingMovies = useMemo(() => upcomingMovies.filter(isPosterValid), []);

  // This function now only pre-loads data for the Featured/Trending buttons.
  const loadLocalSections = () => {
    try {
        const featured = filteredAllMovies.filter(movie => movie.Featured);
        const trending = filteredAllMovies.filter(movie => movie.Trending);
        setFeaturedMovies(featured);
        setTrendingMovies(trending);
    } catch (err) {
        console.error("Failed to pre-load local movie sections:", err);
    }
  };
  
  useEffect(() => {
    loadLocalSections(); // Load local data for the buttons
    handleSearch('', 1); // Fetch initial movies from the API on load
  }, []);


  const handleSearch = async (query, newPage = 1) => {
    setLoading(true);
    setError('');
    setCurrentQuery(query);

    if (newPage === 1) {
      setActiveLanguage('all');
    }
    
    try {
      const result = await searchMovies(query, newPage);
      
      if (result && Array.isArray(result.movies)) {
        const filteredResults = result.movies.filter(isPosterValid);
        
        setMovies(prevMovies => newPage === 1 ? filteredResults : [...prevMovies, ...filteredResults]);
        setHasMore(result.hasMore);
        
        if (!query || query.trim() === "") {
          setActiveSection('trending');
        } else {
          setActiveSection('search');
        }

      } else {
        setMovies([]);
        setHasMore(false);
        setError('Invalid data received from server');
      }
      
      if (result.movies.length === 0 && newPage === 1) {
        setError('No movies found. Try searching for different keywords.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
      if (newPage === 1) setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    handleSearch(currentQuery, newPage);
  };

  const handleMovieClick = async (movie) => {
    if (movie && movie.imdbID) {
      setSelectedMovie(movie);
    }
  };

  const handleTrailerClick = (movie) => {
    if (movie && movie.imdbID) {
      setTrailerMovie(movie);
    }
  };

  const showFeatured = () => {
    setMovies(featuredMovies);
    setActiveSection('featured');
    setActiveLanguage('all');
    setHasMore(false);
  };

  const showTrending = () => {
    setMovies(trendingMovies);
    setActiveSection('trending');
    setActiveLanguage('all');
    setHasMore(false);
  };

  const showAll = () => {
    setMovies(filteredAllMovies.filter(movie => !movie.Upcoming));
    setActiveSection('all');
    setActiveLanguage('all');
    setHasMore(false);
  };

  const showTamil = () => {
    setMovies(filteredTamilMovies);
    setActiveSection('tamil');
    setActiveLanguage('tamil');
    setHasMore(false);
  };

  const showEnglish = () => {
    setMovies(filteredEnglishMovies);
    setActiveSection('english');
    setActiveLanguage('english');
    setHasMore(false);
  };

  const showTelugu = () => {
    setMovies(filteredTeluguMovies);
    setActiveSection('telugu');
    setActiveLanguage('telugu');
    setHasMore(false);
  };

  const showUpcoming = () => {
    setMovies(filteredUpcomingMovies);
    setActiveSection('upcoming');
    setActiveLanguage('all');
    setHasMore(false);
  };

  const showPopular2025 = () => {
    const popular2025 = filteredAllMovies
      .filter(movie => (movie.Year === "2025" || movie.Popular2025))
      .sort((a, b) => parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0));
    setMovies(popular2025);
    setActiveSection('popular2025');
    setActiveLanguage('all');
    setHasMore(false);
  };

  const handleNavSelection = (sectionKey) => {
    switch (sectionKey) {
      case 'home':
        showFeatured();
        break;
      case 'movies':
      case 'search':
        showAll();
        break;
      case 'trending':
        showTrending();
        break;
      case 'upcoming':
        showUpcoming();
        break;
      case 'languages':
        setActiveSection('languages-filter');
        break;
      default:
        showFeatured();
        break;
    }

    if (sectionKey === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (mainContentRef.current) {
      setTimeout(() => {
        const yOffset = -120;
        const y = mainContentRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 50);
    }
  };


  return (
    <div className="App">
      <Particles />
      <Header
        onNavClick={handleNavSelection}
        activeSection={activeSection}
      />

      <main style={{ paddingTop: '80px' }} ref={mainContentRef}>
        <Hero />

        <div style={{
          background: 'var(--darker)',
          padding: '1.5rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }} id="languages">
          <div className="container">
            <h3 style={{
              textAlign: 'center',
              color: '#4ecdc4',
              marginBottom: '1rem',
              fontSize: '1.2rem'
            }}>
              Filter by Language
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              {[
                { key: 'all', label: '🌍 All Languages', action: showAll },
                { key: 'tamil', label: '🎭 Tamil', action: showTamil },
                { key: 'english', label: '🎬 English', action: showEnglish },
                { key: 'telugu', label: '✨ Telugu', action: showTelugu }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={tab.action}
                  style={{
                    padding: '10px 20px',
                    background: activeLanguage === tab.key ?
                      'linear-gradient(135deg, #ff6b6b, #ff8e53)' : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '20px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--darker)',
          padding: '1.5rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div className="container">
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.8rem',
              flexWrap: 'wrap'
            }}>
              {[
                { key: 'featured', label: '⭐ Featured', action: showFeatured },
                { key: 'trending', label: '🔥 Trending', action: showTrending },
                { key: 'popular2025', label: '🚀 Popular 2025', action: showPopular2025 },
                { key: 'upcoming', label: '📅 Upcoming', action: showUpcoming },
                { key: 'all', label: '🎬 All Movies', action: showAll }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={tab.action}
                  style={{
                    padding: '12px 24px',
                    background: (activeSection === tab.key || (tab.key === 'all' && (activeSection === 'tamil' || activeSection === 'english' || activeSection === 'telugu' || activeSection === 'search'))) ?
                      'linear-gradient(135deg, #4ecdc4, #44a08d)' : 'transparent',
                    border: `2px solid ${(activeSection === tab.key || (tab.key === 'all' && (activeSection === 'tamil' || activeSection === 'english' || activeSection === 'telugu' || activeSection === 'search'))) ? 'transparent' : '#ff6b6b'}`,
                    borderRadius: '25px',
                    color: (activeSection === tab.key || (tab.key === 'all' && (activeSection === 'tamil' || activeSection === 'english' || activeSection === 'telugu' || activeSection === 'search'))) ? 'white' : '#ff6b6b',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <SearchBar onSearch={(query) => { setPage(1); handleSearch(query, 1); }} loading={loading} />

        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
            margin: '1rem 0'
          }}>
            <div className="container">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <span>⚠️ {error}</span>
                <button onClick={showAll} style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  backdropFilter: 'blur(10px)'
                }}>
                  Show All Movies
                </button>
              </div>
            </div>
          </div>
        )}

        <MovieGrid
          movies={movies}
          onMovieClick={handleMovieClick}
          onTrailerClick={handleTrailerClick}
          loading={loading}
          category={activeSection}
          hasMore={hasMore}
          loadMore={handleLoadMore}
        />
      </main>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />
      )}

      <footer style={{
        background: 'var(--darker)',
        padding: '3rem 0',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container">
          <p style={{ color: '#b0b0b0', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
            🎬 CineVerse - Multi-Language Cinema Universe
          </p>
          <p style={{ color: '#666', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
            Discover the magic of cinema across languages - Tamil, English, Telugu movies with trailers, ratings, and detailed information.
            From blockbuster hits to critically acclaimed masterpieces.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ color: '#4ecdc4' }}>🎭 Tamil Cinema</span>
            <span style={{ color: '#ff6b6b' }}>🎬 Hollywood</span>
            <span style={{ color: '#ffd166' }}>✨ Tollywood</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;