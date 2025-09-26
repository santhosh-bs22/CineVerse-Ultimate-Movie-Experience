import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import TrailerModal from './components/TrailerModal';
import Particles from './components/Particles';
import { searchMovies, getMovieDetails } from './services/movieAPI';
import { tamilMovies, englishMovies, teluguMovies, upcomingMovies } from './data/moviesData';
import './styles/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerMovie, setTrailerMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('featured');
  const [activeLanguage, setActiveLanguage] = useState('all');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await searchMovies('');
      
      // Ensure we have a valid array
      if (result && Array.isArray(result.movies)) {
        setMovies(result.movies);
        setFeaturedMovies(result.movies.filter(movie => movie && movie.Featured));
        setTrendingMovies(result.movies.filter(movie => movie && movie.Trending));
      } else {
        setMovies([]);
        setFeaturedMovies([]);
        setTrendingMovies([]);
        setError('Invalid data received from server');
      }
    } catch (err) {
      setError('Failed to load movies.');
      setMovies([]);
      setFeaturedMovies([]);
      setTrendingMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    try {
      const result = await searchMovies(query);
      
      // Ensure we have a valid array
      if (result && Array.isArray(result.movies)) {
        setMovies(result.movies);
      } else {
        setMovies([]);
        setError('Invalid data received from server');
      }
      
      setActiveSection('search');
      
      if (result.movies.length === 0) {
        setError('No movies found. Try searching for different keywords.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
      setMovies([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
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
    const validFeatured = featuredMovies.filter(movie => movie && movie.imdbID);
    setMovies(validFeatured);
    setActiveSection('featured');
  };

  const showTrending = () => {
    const validTrending = trendingMovies.filter(movie => movie && movie.imdbID);
    setMovies(validTrending);
    setActiveSection('trending');
  };

  const showAll = () => {
    const allValidMovies = [...tamilMovies, ...englishMovies, ...teluguMovies]
      .filter(movie => movie && movie.imdbID);
    setMovies(allValidMovies);
    setActiveSection('all');
    setActiveLanguage('all');
  };

  const showTamil = () => {
    const validTamil = tamilMovies.filter(movie => movie && movie.imdbID);
    setMovies(validTamil);
    setActiveSection('tamil');
    setActiveLanguage('tamil');
  };

  const showEnglish = () => {
    const validEnglish = englishMovies.filter(movie => movie && movie.imdbID);
    setMovies(validEnglish);
    setActiveSection('english');
    setActiveLanguage('english');
  };

  const showTelugu = () => {
    const validTelugu = teluguMovies.filter(movie => movie && movie.imdbID);
    setMovies(validTelugu);
    setActiveSection('telugu');
    setActiveLanguage('telugu');
  };

  const showUpcoming = () => {
    const validUpcoming = upcomingMovies.filter(movie => movie && movie.imdbID);
    setMovies(validUpcoming);
    setActiveSection('upcoming');
  };

  const showPopular2025 = () => {
    const popular2025 = [...tamilMovies, ...englishMovies, ...teluguMovies]
      .filter(movie => movie && movie.imdbID && (movie.Year === "2025" || movie.Popular2025))
      .sort((a, b) => parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0));
    setMovies(popular2025);
    setActiveSection('popular2025');
  };

  return (
    <div className="App">
      <Particles />
      <Header />
      
      <main style={{ paddingTop: '80px' }}>
        <Hero />
        
        {/* Language Filter Tabs */}
        <div style={{
          background: 'var(--darker)',
          padding: '1.5rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
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

        {/* Category Navigation Tabs */}
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
                    background: activeSection === tab.key ? 
                      'linear-gradient(135deg, #4ecdc4, #44a08d)' : 'transparent',
                    border: `2px solid ${activeSection === tab.key ? 'transparent' : '#ff6b6b'}`,
                    borderRadius: '25px',
                    color: activeSection === tab.key ? 'white' : '#ff6b6b',
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

        <SearchBar onSearch={handleSearch} loading={loading} />
        
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

      {/* Footer */}
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