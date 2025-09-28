import React, { useState } from 'react';

const MovieCard = ({ movie, onClick, onTrailerClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [posterError, setPosterError] = useState(false);

  // Function to handle poster image errors
  const handlePosterError = () => {
    setPosterError(true);
  };

  // Function to get fallback poster based on movie language
  const getFallbackPoster = () => {
    // Check if Language property exists, otherwise default to a general emoji
    const lang = movie.Language ? movie.Language.toLowerCase() : 'english';
    const colors = {
      tamil: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
      telugu: 'linear-gradient(135deg, #ffd166, #ffb347)',
      english: 'linear-gradient(135deg, #ff6b6b, #ef476f)'
    };
    
    // Choose emoji based on media type for fallback display
    let emoji = '🎬';
    if (movie.Type === 'series') {
        emoji = '📺'; // Emoji for Series/TV Show/Anime
    } else if (lang === 'tamil') {
        emoji = '🎭';
    } else if (lang === 'telugu') {
        emoji = '✨';
    }

    const color = colors[lang] || colors.english;
    
    return (
      <div style={{
        width: '100%',
        height: '350px',
        background: color,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem',
        fontWeight: 'bold'
      }}>
        <div>{emoji}</div>
        <div style={{ fontSize: '1rem', marginTop: '10px' }}>
          {movie.Title}
        </div>
        <div style={{ fontSize: '0.8rem', opacity: '0.8', marginTop: '5px' }}>
          {movie.Year}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`movie-card hover-lift ${isHovered ? 'glow-animation' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
        borderRadius: '15px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Featured Badge */}
      {movie.Featured && (
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '0.7rem',
          fontWeight: 'bold',
          zIndex: 2
        }}>
          ⭐ Featured
        </div>
      )}
      
      {/* Language/Type Badge */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '4px 10px',
        borderRadius: '10px',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        zIndex: 2
      }}>
        {movie.Type === 'series' ? '📺' : 
         (movie.Language === 'Tamil' ? '🎭' : 
         (movie.Language === 'Telugu' ? '✨' : '🎬'))} {movie.Language || 'N/A'}
      </div>

      {/* Upcoming Badge */}
      {movie.Upcoming && (
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '15px',
          background: 'linear-gradient(135deg, #9c27b0, #673ab7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '0.7rem',
          fontWeight: 'bold',
          zIndex: 2
        }}>
          📅 Coming Soon
        </div>
      )}
      
      {/* Poster Section - Entirely Clickable for Details */}
      <div 
        style={{ position: 'relative', overflow: 'hidden' }}
        onClick={() => onClick(movie)}
      >
        {/* Conditional Poster Rendering */}
        {!posterError && movie.Poster && !movie.Poster.includes('placeholder') ? (
          <img 
            src={movie.Poster}
            alt={movie.Title}
            style={{
              width: '100%',
              height: '350px',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              cursor: 'pointer'
            }}
            onError={handlePosterError}
            onLoad={() => setPosterError(false)}
          />
        ) : (
          getFallbackPoster()
        )}
        
        {/* Overlay with Trailer Button */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '20px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering details click
              onTrailerClick(movie);
            }}
            style={{
              background: 'rgba(78, 205, 196, 0.9)',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            ▶ Watch Trailer
          </button>
        </div>

        {/* Rating */}
        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(0,0,0,0.8)',
            color: '#ffd700',
            padding: '5px 10px',
            borderRadius: '10px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
            ⭐ {movie.imdbRating}
          </div>
        )}

        {/* Year */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '15px',
          background: 'rgba(255, 107, 107, 0.9)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '10px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          {movie.Year}
        </div>
      </div>

      {/* Movie Info */}
      <div 
        style={{ padding: '20px', cursor: 'pointer' }}
        onClick={() => onClick(movie)}
      >
        <h3 style={{ 
          color: 'white', 
          marginBottom: '10px',
          fontSize: '1.2rem',
          fontWeight: '600',
          lineHeight: '1.3',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '3rem'
        }}>
          {movie.Title}
        </h3>
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <span style={{ color: '#4ecdc4', fontSize: '0.9rem' }}>
            {movie.Runtime || 'Duration N/A'}
          </span>
          <span style={{ color: '#ff6b6b', fontSize: '0.8rem', fontWeight: 'bold' }}>
            {movie.Type === 'series' ? '📺 SERIES' : (movie.Genre ? movie.Genre.split(',')[0].toUpperCase() : 'GENRE N/A')}
          </span>
        </div>
        
        <p style={{ 
          color: '#b0b0b0', 
          fontSize: '0.85rem',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '4.2rem'
        }}>
          {movie.Plot || 'Plot description not available.'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;