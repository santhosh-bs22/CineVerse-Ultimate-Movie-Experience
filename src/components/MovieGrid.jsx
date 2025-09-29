// src/components/MovieGrid.jsx

import React from "react";
import MovieCard from "./MovieCard";

const MovieGrid = ({
  movies,
  onMovieClick,
  onTrailerClick,
  loading,
  category,
  hasMore,
  loadMore,
}) => {
  if (loading && (!movies || movies.length === 0)) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem",
          color: "white",
        }}
      >
        <div className="loading-spinner"></div>
        <h3 style={{ marginTop: "1rem" }}>Loading Awesome Movies...</h3>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem",
          color: "white",
        }}
      >
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🎬</div>
        <h3>No movies found in this category</h3>
        <p>Try browsing other categories or use the search feature</p>
      </div>
    );
  }

  const getCategoryTitle = () => {
    const titles = {
      featured: "Featured Movies",
      trending: "Trending Now",
      tamil: "Tamil Cinema Masterpieces",
      english: "Hollywood Blockbusters",
      telugu: "Tollywood Specials",
      upcoming: "Upcoming Movies",
      popular2025: "Popular in 2025",
      all: "All Movies Collection",
      search: "Search Results"
    };
    return titles[category] || "Movie Collection";
  };

  return (
    <section style={{ padding: "2rem 0" }}>
      <div className="container">
        <h2 className="section-title fade-in-up">
          {getCategoryTitle()} ({movies.length})
        </h2>
        <div className="movies-grid">
          {movies.map((movie, index) => (
            <div
              key={`${movie.imdbID}-${index}`}
              className="fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard
                movie={movie}
                onClick={onMovieClick}
                onTrailerClick={onTrailerClick}
              />
            </div>
          ))}
        </div>
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={loadMore}
              disabled={loading}
              className="btn btn-primary"
              style={{
                padding: '12px 30px',
                background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
              }}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieGrid;