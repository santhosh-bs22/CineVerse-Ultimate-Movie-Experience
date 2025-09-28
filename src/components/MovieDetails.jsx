import React, { useState } from 'react';

const MovieDetails = ({ movie, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!movie) return null;
  
  // New Component to render a cast member card
  const CastMemberCard = ({ member }) => (
    <div className="cast-member-card">
        <img 
            src={member.profilePath} 
            alt={member.name} 
            className="cast-profile-image"
            // Use TMDB's placeholder image if a profile path is missing or errors out
            onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/100x100/555/fff?text=No+Pic'; // Smaller placeholder for circular image
            }}
        />
        <strong className="cast-name">{member.name}</strong>
        <p className="cast-character" title={member.character}>as {member.character}</p>
    </div>
  );


  return (
    <div className="movie-details-modal" onClick={onClose}>
      <div className="movie-details-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        {/* Header Section */}
        <div className="header-section">
          {/* Poster */}
          <div className="movie-poster-container">
            <img 
              src={movie.Poster}
              alt={movie.Title}
            />
          </div>

          {/* Basic Info */}
          <div className="basic-info-section">
            <h1 className="movie-title">
              {movie.Title}
            </h1>
            
            <div className="metadata-row">
              <span className="info-badge badge-year">{movie.Year}</span>
              <span className="info-badge badge-rated">{movie.Rated}</span>
              <span className="info-badge badge-runtime">{movie.Runtime}</span>
              <span className="info-badge badge-type">
                {movie.Type === 'series' ? '📺 Series' : '🎬 Movie'}
              </span>
            </div>

            {/* Rating */}
            <div className="rating-box">
              <span>⭐</span>
              <span className="rating-score">{movie.imdbRating}/10</span>
              <span className="rating-votes">({movie.imdbVotes} votes)</span>
            </div>

            <div className="detail-line">
              <strong>Genre: </strong>
              <span>{movie.Genre}</span>
            </div>
            <div className="detail-line">
              <strong>Language: </strong>
              <span>{movie.Language}</span>
            </div>
            <div className="detail-line">
              <strong>Country: </strong>
              <span>{movie.Country}</span>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <button 
                onClick={() => setActiveTab('trailer')}
                className="trailer-button"
              >
                ▶ Watch Trailer
              </button>

              {movie.Featured && (
                <span className="featured-badge">
                  ⭐ Featured
                </span>
              )}

              {movie.Trending && (
                <span className="trending-badge">
                  🔥 Trending
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tab-buttons">
          {[
            { key: 'details', label: 'Storyline', icon: '📖' },
            { key: 'trailer', label: 'Trailer', icon: '🎬' },
            { key: 'cast', label: 'Cast & Crew', icon: '👥' },
            { key: 'technical', label: 'Technical', icon: '⚙️' },
            { key: 'awards', label: 'Awards', icon: '🏆' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={activeTab === tab.key ? 'tab-button active' : 'tab-button'}
            >
              {tab.icon} {tab.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div>
              <h3 className="section-title">Storyline</h3>
              <p className="storyline-text">{movie.Plot}</p>

              <div className="info-grid">
                <div className="info-box">
                  <strong>🎬 Director</strong>
                  <p>{movie.Director}</p>
                </div>
                <div className="info-box">
                  <strong>✍️ Writer</strong>
                  <p>{movie.Writer}</p> 
                </div>
                <div className="info-box">
                  <strong>📅 Release Date</strong>
                  <p>{movie.Released}</p>
                </div>
                <div className="info-box">
                  <strong>🌍 Country</strong>
                  <p>{movie.Country}</p>
                </div>
              </div>
            </div>
          )}

          {/* Trailer Tab */}
          {activeTab === 'trailer' && movie.Trailer && (
            <div>
              <h3 className="section-title">Official Trailer - {movie.Title}</h3>
              <div className="video-container">
                <iframe
                  src={movie.Trailer}
                  title={`${movie.Title} Official Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="trailer-caption">
                Watch the official trailer of "{movie.Title}"
              </p>
            </div>
          )}

          {/* Cast & Crew Tab */}
          {activeTab === 'cast' && (
            <div>
              <h3 className="section-title">Cast</h3>
              
              {/* Grid for Cast Images */}
              {movie.FullCast && movie.FullCast.length > 0 ? (
                <div className="cast-grid">
                  {movie.FullCast.map(member => (
                    <CastMemberCard key={member.id || member.name} member={member} />
                  ))}
                </div>
              ) : (
                <p style={{ color: '#b0b0b0' }}>Detailed cast information with images is not available. Try searching for a movie, or check back later.</p>
              )}
              
              <h3 className="section-title" style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>Crew Details</h3>
              <div className="info-grid">
                <div className="info-box">
                  <strong>🎬 Director</strong>
                  <p>{movie.Director}</p>
                </div>
                <div className="info-box">
                  <strong>✍️ Writers</strong>
                  <p>{movie.Writer}</p>
                </div>
                <div className="info-box">
                  <strong>🏢 Production</strong>
                  <p>{movie.Production}</p>
                </div>
              </div>
            </div>
          )}

          {/* Technical Tab */}
          {activeTab === 'technical' && (
            <div>
              <h3 className="section-title">Technical Details</h3>
              <div className="info-grid">
                <div className="info-box">
                  <strong>📺 Type</strong>
                  <p>{movie.Type === 'series' ? 'TV Series' : 'Movie'}</p>
                </div>
                <div className="info-box">
                  <strong>⏱️ Runtime</strong>
                  <p>{movie.Runtime}</p>
                </div>
                <div className="info-box">
                  <strong>🎭 Genre</strong>
                  <p>{movie.Genre}</p>
                </div>
                <div className="info-box">
                  <strong>📅 Released</strong>
                  <p>{movie.Released}</p>
                </div>
                <div className="info-box">
                  <strong>🏷️ Rated</strong>
                  <p>{movie.Rated}</p>
                </div>
                <div className="info-box">
                  <strong>💬 Language</strong>
                  <p>{movie.Language}</p>
                </div>
                <div className="info-box">
                  <strong>🌍 Country</strong>
                  <p>{movie.Country}</p>
                </div>
                <div className="info-box">
                  <strong>💰 Box Office</strong>
                  <p>{movie.BoxOffice}</p>
                </div>
              </div>
            </div>
          )}

          {/* Awards Tab */}
          {activeTab === 'awards' && (
            <div>
              <h3 className="section-title">Awards & Recognition</h3>
              <div className="info-box">
                <strong>🏆 Awards</strong>
                <p>{movie.Awards}</p>
              </div>
              <div className="info-box rating-info-box">
                <strong>⭐ IMDb Rating</strong>
                <div className="rating-display">
                  <span>{movie.imdbRating}/10</span>
                  <span className="rating-votes">from {movie.imdbVotes} votes</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stylesheet with new cast grid styles */}
      <style jsx>{`
        /* Base styles */
        .movie-details-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 10px;
          overflow: auto;
        }

        .movie-details-content {
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          border-radius: 15px;
          max-width: 1000px;
          width: 100%;
          max-height: 95vh;
          overflow: auto;
          position: relative;
          border: 2px solid rgba(255, 107, 107, 0.3);
          color: white;
        }

        .close-button {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 107, 107, 0.9);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          font-weight: bold;
          z-index: 2001;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-section {
          display: flex;
          padding: 20px;
          gap: 20px;
          background: rgba(0, 0, 0, 0.3);
          flex-direction: row;
        }

        .movie-poster-container {
          flex-shrink: 0;
          width: 250px;
          border-radius: 10px;
          overflow: hidden;
        }

        .movie-poster-container img {
          width: 100%;
          height: 350px;
          object-fit: cover;
          display: block;
        }

        .basic-info-section {
          flex: 1;
          min-width: 0;
        }

        .movie-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }
        
        .metadata-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 15px;
          align-items: center;
        }

        .info-badge {
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 0.9rem;
        }

        .badge-year { background: rgba(255, 107, 107, 0.2); }
        .badge-rated { background: rgba(78, 205, 196, 0.2); }
        .badge-runtime { background: rgba(255, 209, 102, 0.2); }
        .badge-type { background: rgba(156, 39, 176, 0.2); }

        .rating-box {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 215, 0, 0.2);
          padding: 6px 15px;
          border-radius: 20px;
          margin-bottom: 15px;
          border: 1px solid rgba(255, 215, 0, 0.3);
        }

        .rating-box span {
          font-size: 1.2rem;
          margin-right: 5px;
        }

        .rating-score { font-weight: bold; }
        .rating-votes { margin-left: 8px; opacity: 0.8; font-size: 0.9rem; }

        .detail-line {
          margin-bottom: 10px;
        }
        .detail-line strong { color: #4ecdc4; }
        
        .quick-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .trailer-button {
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          color: white;
          cursor: pointer;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: transform 0.2s ease;
        }
        .trailer-button:hover { transform: scale(1.05); }

        .featured-badge, .trending-badge {
          padding: 10px 15px;
          border-radius: 20px;
          color: black;
          font-weight: bold;
          font-size: 0.8rem;
          display: inline-block;
          white-space: nowrap;
        }
        .featured-badge { background: linear-gradient(135deg, #ffd166, #ffb347); }
        .trending-badge { background: linear-gradient(135deg, #ef476f, #ff6b6b); color: white; }

        .tab-buttons {
          display: flex;
          background: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          flex-wrap: wrap;
        }

        .tab-button {
          flex: 1 0 auto;
          min-width: 120px;
          padding: 15px 10px;
          background: transparent;
          border: none;
          color: #b0b0b0;
          cursor: pointer;
          font-weight: bold;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        .tab-button.active {
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          color: white;
        }
        .tab-button:hover {
          color: white;
        }

        .tab-content {
          padding: 20px;
          max-height: 400px;
          overflow-y: auto;
        }

        .section-title {
          color: #ff6b6b;
          margin-bottom: 15px;
          font-size: 1.3rem;
        }
        
        .storyline-text {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 1rem;
        }
        
        /* New Cast Grid */
        .cast-grid {
            display: flex;
            gap: 15px;
            overflow-x: auto;
            padding-bottom: 15px;
            margin-bottom: 20px;
            scroll-snap-type: x mandatory;
        }
        .cast-grid > div {
            flex-shrink: 0;
            scroll-snap-align: start;
        }

        /* NEW CAST CARD STYLES */
        .cast-member-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            overflow: hidden;
            text-align: center;
            padding-bottom: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            width: 120px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .cast-profile-image {
            width: 100px;
            height: 100px;
            border-radius: 50%; /* Make it circular */
            object-fit: cover;
            margin: 10px auto;
            display: block;
            border: 3px solid #4ecdc4; /* Cyan border for style */
        }
        
        .cast-name {
            color: #ff6b6b; 
            font-size: 0.9rem;
            display: block;
            padding: 0 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .cast-character { 
            color: #b0b0b0; 
            font-size: 0.75rem;
            margin: 5px 0 0;
            padding: 0 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        /* END NEW CAST CARD STYLES */


        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }

        .info-box {
          background: rgba(255, 255, 255, 0.05);
          padding: 15px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 10px;
        }
        .info-box strong { color: #4ecdc4; }
        .info-box p { margin: 8px 0 0 0; color: #b0b0b0; line-height: 1.5; }
        .info-box.rating-info-box { margin-top: 15px; }

        .video-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 15px;
          border: 2px solid rgba(255, 107, 107, 0.3);
        }
        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .trailer-caption {
          color: #b0b0b0;
          text-align: center;
          font-style: italic;
        }
        .rating-display {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rating-display span:first-of-type {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: black;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        /* Media Queries for Responsiveness */
        @media (max-width: 768px) {
          .movie-details-content {
            margin: 5px;
            max-height: 98vh;
            border-radius: 10px;
          }
          
          .header-section {
            flex-direction: column;
            text-align: center;
            padding: 15px;
            gap: 15px;
          }
          
          .movie-poster-container {
            width: 100%;
            max-width: 280px;
            margin: 0 auto;
          }
          
          .movie-poster-container img {
            height: 320px;
          }
          
          .tab-buttons button {
            min-width: auto;
            flex: 1 1 0;
            padding: 12px 8px;
            font-size: 0.8rem;
          }
          
          .movie-title {
            font-size: 1.6rem;
          }
        }
        
        @media (max-width: 480px) {
          .movie-details-content {
            border-radius: 10px;
            padding: 0; /* Adjusting for smaller screens */
          }
          
          .header-section {
            padding: 10px;
          }
          
          .tab-buttons {
            flex-direction: row; /* Keep tabs horizontal but allow wrapping */
            justify-content: space-between;
          }
          
          .quick-actions {
            justify-content: center;
          }
          
          .movie-title {
            font-size: 1.4rem;
          }

          .info-grid {
            grid-template-columns: 1fr; /* Stack columns on tiny screens */
          }
        }
      `}</style>
    </div>
  );
};

export default MovieDetails;