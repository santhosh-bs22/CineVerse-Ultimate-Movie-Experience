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

// NEW HELPER: Function to check for valid poster (Poster is true AND is not a known placeholder)
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('featured');
  const [activeLanguage, setActiveLanguage] = useState('all');

  // New ref for the main content area for programmatic scrolling
  const mainContentRef = useRef(null); 

  // NEW: Memoize filtered movie lists to apply the Poster check once and consistently
  const filteredAllMovies = useMemo(() => {
    return allMovies.filter(movie => movie && movie.imdbID && isPosterValid(movie));
  }, []);

  const filteredTamilMovies = useMemo(() => {
    return tamilMovies.filter(isPosterValid);
  }, []);

  const filteredEnglishMovies = useMemo(() => {
    return englishMovies.filter(isPosterValid);
  }, []);

  const filteredTeluguMovies = useMemo(() => {
    return teluguMovies.filter(isPosterValid);
  }, []);
  
  const filteredUpcomingMovies = useMemo(() => {
    return upcomingMovies.filter(isPosterValid);
  }, []);
  // END NEW MEMOIZED FILTERS

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    setError('');
    try {
      // Use the memoized filtered lists
      const featured = filteredAllMovies.filter(movie => movie.Featured);
      const trending = filteredAllMovies.filter(movie => movie.Trending);
        
      // Use the filtered list for state
      setFeaturedMovies(featured);
      setTrendingMovies(trending);

      // FIX 1: Set initial movie list to a single random featured movie for refresh/initial load
      if (featured.length > 0) {
        const randomIndex = Math.floor(Math.random() * featured.length);
        // Set the initial view to a single random featured movie
        setMovies([featured[randomIndex]]); 
        setActiveSection('random'); // New initial state/section
      } else {
        setMovies([]);
        setActiveSection('featured');
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
    
    // Reset language filter on search
    setActiveLanguage('all'); 
    
    try {
      const result = await searchMovies(query);
      
      // Ensure we have a valid array
      if (result && Array.isArray(result.movies)) {
        // FIX 2: Apply filter to ensure no results without a poster make it through
        const filteredResults = result.movies.filter(isPosterValid);
        setMovies(filteredResults);
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
    // Uses pre-filtered featuredMovies
    setMovies(featuredMovies);
    setActiveSection('featured');
    setActiveLanguage('all');
  };

  const showTrending = () => {
    // Uses pre-filtered trendingMovies
    setMovies(trendingMovies);
    setActiveSection('trending');
    setActiveLanguage('all');
  };

  const showAll = () => {
    // Use filteredAllMovies and exclude upcoming
    setMovies(filteredAllMovies.filter(movie => !movie.Upcoming)); 
    setActiveSection('all');
    setActiveLanguage('all');
  };

  const showTamil = () => {
    // Uses pre-filtered list
    setMovies(filteredTamilMovies); 
    setActiveSection('tamil');
    setActiveLanguage('tamil');
  };

  const showEnglish = () => {
    // Uses pre-filtered list
    setMovies(filteredEnglishMovies); 
    setActiveSection('english');
    setActiveLanguage('english');
  };

  const showTelugu = () => {
    // Uses pre-filtered list
    setMovies(filteredTeluguMovies); 
    setActiveSection('telugu');
    setActiveLanguage('telugu');
  };

  const showUpcoming = () => {
    // Uses pre-filtered list
    setMovies(filteredUpcomingMovies); 
    setActiveSection('upcoming');
    setActiveLanguage('all');
  };

  const showPopular2025 = () => {
    const popular2025 = filteredAllMovies // Use filteredAllMovies
      .filter(movie => (movie.Year === "2025" || movie.Popular2025))
      .sort((a, b) => parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0));
    setMovies(popular2025);
    setActiveSection('popular2025');
    setActiveLanguage('all');
  };

  // Centralized navigation function
  const handleNavSelection = (sectionKey) => {
    // 1. Filter/Content Action
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
        // Clicking "Languages" scrolls to the filter section without changing the movie list state
        setActiveSection('languages-filter');
        break;
      default:
        showFeatured();
        break;
    }

    // 2. Scroll Action
    if (sectionKey === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (mainContentRef.current) {
      // For all other sections, scroll to the start of the main content area
      // Short delay to ensure state update (e.g., loading spinner removal) happens first
      setTimeout(() => {
        const yOffset = -120; // Adjust for fixed header height
        const y = mainContentRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 50); 
    }
  };


  return (
    <div className="App">
      <Particles />
      {/* Pass the navigation handler and active state to Header */}
      {/* Treat 'random' as 'featured' for header highlighting */}
      <Header 
        onNavClick={handleNavSelection}
        activeSection={activeSection === 'random' ? 'featured' : activeSection}
      />
      
      {/* Attach the ref to the main content area */}
      <main style={{ paddingTop: '80px' }} ref={mainContentRef}> 
        <Hero />
        
        {/* Language Filter Tabs - Added id for direct link if needed */}
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
                    background: (activeSection === tab.key || activeSection === 'random') || (tab.key === 'all' && (activeSection === 'tamil' || activeSection === 'english' || activeSection === 'telugu' || activeSection === 'search')) ? 
                      'linear-gradient(135deg, #4ecdc4, #44a08d)' : 'transparent',
                    border: `2px solid ${(activeSection === tab.key || activeSection === 'random') || (tab.key === 'all' && (activeSection === 'tamil' || activeSection === 'english' || activeSection === 'telugu' || activeSection === 'search')) ? 'transparent' : '#ff6b6b'}`,
                    borderRadius: '25px',
                    color: (activeSection === tab.key || activeSection === 'random') || (tab.key === 'all' && (activeSection === 'tamil' || activeSection === 'english' || activeSection === 'telugu' || activeSection === 'search')) ? 'white' : '#ff6b6b',
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