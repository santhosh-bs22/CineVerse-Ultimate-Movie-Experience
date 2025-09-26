import React, { useState, useEffect } from 'react';
import { getMovieTrailer } from '../services/movieAPI';

const TrailerModal = ({ movie, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState(movie.Trailer);
  const [loading, setLoading] = useState(!movie.Trailer);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!movie.Trailer) {
        setLoading(true);
        try {
          const trailer = await getMovieTrailer(movie.imdbID);
          setTrailerUrl(trailer);
          if (!trailer) {
            setError('No trailer available for this movie');
          }
        } catch (err) {
          setError('Failed to load trailer');
          console.error('Error fetching trailer:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTrailer();
  }, [movie]);

  if (!movie) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }} onClick={onClose}>
      
      <div style={{
        background: '#1a1a1a',
        borderRadius: '15px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        <button style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'rgba(255, 107, 107, 0.9)',
          border: 'none',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '20px',
          fontWeight: 'bold',
          zIndex: 2001,
          backdropFilter: 'blur(10px)'
        }} onClick={onClose}>×</button>

        {/* Trailer Video */}
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          background: '#000'
        }}>
          {loading ? (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              <div className="loading-spinner"></div>
              <span style={{ marginLeft: '10px' }}>Loading trailer...</span>
            </div>
          ) : error ? (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: '#ff6b6b',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎬</div>
              <h3>Trailer Not Available</h3>
              <p>{error}</p>
              <button 
                onClick={onClose}
                style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  background: '#ff6b6b',
                  border: 'none',
                  borderRadius: '20px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          ) : trailerUrl ? (
            <iframe
              src={trailerUrl}
              title={`${movie.Title} Trailer`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '15px 15px 0 0'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: '#b0b0b0',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '10px' }}>📽️</div>
              <h3>No Trailer Available</h3>
              <p>We couldn't find a trailer for this movie.</p>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div style={{ padding: '20px' }}>
          <h2 style={{ 
            color: '#ff6b6b', 
            marginBottom: '10px',
            fontSize: '1.5rem'
          }}>
            {movie.Title} ({movie.Year}) - Official Trailer
          </h2>
          <p style={{ color: '#b0b0b0', lineHeight: '1.5' }}>
            {movie.Plot}
          </p>
        </div>
      </div>

      <style jsx>{`
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #ff6b6b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TrailerModal;