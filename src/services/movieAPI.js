import { TMDB_CONFIG } from '../config/tmdb';

// Helper function to format TMDB data to match your existing structure
const formatMovieData = (tmdbMovie) => {
  return {
    imdbID: tmdbMovie.id.toString(),
    Title: tmdbMovie.title || tmdbMovie.original_title,
    Year: tmdbMovie.release_date ? tmdbMovie.release_date.substring(0, 4) : 'N/A',
    Rated: tmdbMovie.adult ? 'A' : 'UA',
    Released: tmdbMovie.release_date || 'N/A',
    Runtime: tmdbMovie.runtime ? `${tmdbMovie.runtime} min` : 'N/A',
    Genre: tmdbMovie.genres ? tmdbMovie.genres.map(genre => genre.name).join(', ') : 'Drama',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: 'N/A',
    Plot: tmdbMovie.overview || 'No description available',
    Language: 'Tamil',
    Country: 'India',
    Awards: 'N/A',
    Poster: tmdbMovie.poster_path 
      ? `${TMDB_CONFIG.imageBaseUrl}${tmdbMovie.poster_path}`
      : 'https://via.placeholder.com/300x450/333/fff?text=No+Poster',
    imdbRating: tmdbMovie.vote_average ? tmdbMovie.vote_average.toFixed(1) : 'N/A',
    imdbVotes: tmdbMovie.vote_count ? tmdbMovie.vote_count.toString() : '0',
    Type: 'movie',
    BoxOffice: 'N/A',
    Production: tmdbMovie.production_companies && tmdbMovie.production_companies.length > 0 
      ? tmdbMovie.production_companies[0].name 
      : 'N/A',
    Trailer: null,
    Featured: tmdbMovie.vote_average > 7.5,
    Trending: tmdbMovie.popularity > 50
  };
};

// Enhanced trailer fetching function
const getTrailerUrl = (videos) => {
  if (!videos || !videos.results || videos.results.length === 0) return null;
  
  // Priority: Official Trailer > Trailer > Teaser > First video
  const officialTrailer = videos.results.find(video => 
    video.type === 'Trailer' && video.site === 'YouTube' && video.official
  );
  
  const anyTrailer = videos.results.find(video => 
    video.type === 'Trailer' && video.site === 'YouTube'
  );
  
  const teaser = videos.results.find(video => 
    video.type === 'Teaser' && video.site === 'YouTube'
  );
  
  const firstVideo = videos.results.find(video => 
    video.site === 'YouTube'
  );
  
  const selectedVideo = officialTrailer || anyTrailer || teaser || firstVideo;
  
  return selectedVideo ? `https://www.youtube.com/embed/${selectedVideo.key}` : null;
};

// Fetch movie details including cast and crew
const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.baseUrl}/movie/${movieId}?api_key=${TMDB_CONFIG.apiKey}&append_to_response=credits,videos`
    );
    
    if (!response.ok) throw new Error('Failed to fetch movie details');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Fetch only trailers for better performance
const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.baseUrl}/movie/${movieId}/videos?api_key=${TMDB_CONFIG.apiKey}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch trailer');
    
    const data = await response.json();
    return getTrailerUrl(data);
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Main search function
export const searchMovies = async (query) => {
  await delay(300);
  
  try {
    let url;
    
    if (!query || query.trim() === '') {
      url = `${TMDB_CONFIG.baseUrl}/discover/movie?api_key=${TMDB_CONFIG.apiKey}&with_original_language=ta&sort_by=popularity.desc&page=1`;
    } else {
      url = `${TMDB_CONFIG.baseUrl}/search/movie?api_key=${TMDB_CONFIG.apiKey}&query=${encodeURIComponent(query)}&with_original_language=ta`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Failed to fetch movies');
    
    const data = await response.json();
    
    const moviesToProcess = data.results.slice(0, 12);
    const moviesWithDetails = [];
    
    for (const movie of moviesToProcess) {
      try {
        const details = await fetchMovieDetails(movie.id);
        if (!details) continue;
        
        const formattedMovie = formatMovieData(details);
        
        // Add director and actors
        if (details.credits) {
          const director = details.credits.crew.find(person => person.job === 'Director');
          const mainActors = details.credits.cast.slice(0, 3).map(actor => actor.name);
          
          formattedMovie.Director = director ? director.name : 'N/A';
          formattedMovie.Actors = mainActors.join(', ');
        }
        
        // Add trailer
        formattedMovie.Trailer = getTrailerUrl(details.videos);
        
        moviesWithDetails.push(formattedMovie);
      } catch (error) {
        console.error(`Error processing movie ${movie.id}:`, error);
      }
    }
    
    return {
      movies: moviesWithDetails,
      totalResults: moviesWithDetails.length
    };
    
  } catch (error) {
    console.error('Error searching movies:', error);
    
    // Fallback to local data
    const { tamilMovies } = await import('../data/moviesData');
    const filteredMovies = query 
      ? tamilMovies.filter(movie =>
          movie.Title.toLowerCase().includes(query.toLowerCase()) ||
          movie.Director.toLowerCase().includes(query.toLowerCase()) ||
          movie.Actors.toLowerCase().includes(query.toLowerCase()) ||
          movie.Genre.toLowerCase().includes(query.toLowerCase())
        )
      : tamilMovies;
    
    return {
      movies: filteredMovies,
      totalResults: filteredMovies.length
    };
  }
};

// Get individual movie details with enhanced trailer support
export const getMovieDetails = async (imdbID) => {
  await delay(200);
  
  try {
    const movieId = parseInt(imdbID);
    
    if (isNaN(movieId)) {
      throw new Error('Invalid movie ID');
    }
    
    const details = await fetchMovieDetails(movieId);
    
    if (!details) {
      throw new Error('Movie not found');
    }
    
    const formattedMovie = formatMovieData(details);
    
    // Enhance with credits
    if (details.credits) {
      const director = details.credits.crew.find(person => person.job === 'Director');
      const mainActors = details.credits.cast.slice(0, 5).map(actor => actor.name);
      
      formattedMovie.Director = director ? director.name : 'N/A';
      formattedMovie.Actors = mainActors.join(', ');
    }
    
    // Add trailer
    formattedMovie.Trailer = getTrailerUrl(details.videos);
    
    return formattedMovie;
    
  } catch (error) {
    console.error('Error fetching movie details:', error);
    
    // Fallback to local data
    const { tamilMovies } = await import('../data/moviesData');
    return tamilMovies.find(movie => movie.imdbID === imdbID) || null;
  }
};

// Separate function to fetch trailer only
export const getMovieTrailer = async (imdbID) => {
  try {
    const movieId = parseInt(imdbID);
    
    if (isNaN(movieId)) {
      throw new Error('Invalid movie ID');
    }
    
    return await fetchMovieTrailer(movieId);
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};