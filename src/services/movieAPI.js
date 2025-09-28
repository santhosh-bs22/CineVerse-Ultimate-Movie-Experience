// src/services/movieAPI.js

import { TMDB_CONFIG } from "../config/tmdb";
// 1. Static Import of allMovies
import { allMovies } from "../data/moviesData";

// Hardcoded map for local movies to their TMDB IDs
const LOCAL_ID_TO_TMDB_MAP = {
    // Tamil Movies
    "tt1": 593743, // Vikram
    "tt2": 630129, // Master
    "tt3": 801112, // Ponniyin Selvan: Part 1
    "tt4": 890812, // Jai Bhim
    "tt5": 585295, // Kaithi
    "tt6": 618323, // Asuran
    "tt7": 521877, // Vada Chennai
    "tt8": 556666, // Super Deluxe
    "tt9": 539665, // 96
    "tt10": 546554, // Pariyerum Perumal
    "tt11": 757805, // Karnan
    "tt12": 695995, // Soorarai Pottru
    // Telugu Movies
    "tt13": 515001, // RRR
    "tt14": 410815, // Baahubali 2: The Conclusion
    "tt15": 788772, // Pushpa: The Rise
    "tt16": 582845, // Ala Vaikunthapurramuloo
    "tt17": 639352, // Sarileru Neekevvaru
    "tt18": 550988, // Maharshi
    "tt19": 490518, // Arjun Reddy
    "tt20": 472502, // Bharat Ane Nenu
    "tt21": 501869, // Mahanati
    "tt22": 560049, // F2: Fun and Frustration
    "tt23": 545609, // Jersey
    "tt24": 579737, // Majili
    // English Movies
    "tt25": 76600, // Avatar: The Way of Water
    "tt26": 634649, // Spider-Man: No Way Home
    "tt27": 299534, // Avengers: Endgame
    "tt28": 414906, // The Batman
    "tt29": 361743, // Top Gun: Maverick
    "tt30": 438631, // Dune
    "tt31": 603692, // John Wick: Chapter 4
    "tt32": 505642, // Black Panther: Wakanda Forever
    "tt33": 502356, // The Super Mario Bros. Movie
    "tt34": 447365, // Guardians of the Galaxy Vol. 3
    "tt35": 829280, // Oppenheimer
    "tt36": 667538, // Barbie
    // Upcoming/Other movies (Add as needed)
    "tt48": 609681, // Avatar 3
};


// Helper function to get property based on media type
const getProperty = (tmdbData, movieProperty, tvProperty) => 
    tmdbData.media_type === 'tv' || tmdbData.Type === 'series' ? tmdbData[tvProperty] : tmdbData[movieProperty];

// Helper function to format TMDB data to match your existing structure
const formatMovieData = (tmdbData) => {
  // Standardize media type handling
  const isTV = tmdbData.media_type === 'tv' || tmdbData.Type === 'series' || tmdbData.Type === 'anime'; 
  const title = getProperty(tmdbData, 'title', 'name');
  const releaseDate = getProperty(tmdbData, 'release_date', 'first_air_date');
  const type = isTV ? 'series' : 'movie'; // Standardize series type

  let runtime;
  if (isTV) {
      // Use the first episode run time as a proxy for series runtime
      runtime = tmdbData.episode_run_time && tmdbData.episode_run_time.length > 0
          ? `${tmdbData.episode_run_time[0]} min/ep` 
          : 'N/A';
  } else {
      runtime = tmdbData.runtime ? `${tmdbData.runtime} min` : "N/A";
  }

  // Internal TMDB media type ('movie', 'tv')
  const mediaType = tmdbData.media_type || (isTV ? 'tv' : 'movie');

  return {
    imdbID: tmdbData.id.toString(),
    Title: title || 'N/A',
    Year: releaseDate
      ? releaseDate.substring(0, 4)
      : "N/A",
    Rated: tmdbData.adult ? "A" : "UA", 
    Released: releaseDate || "N/A",
    Runtime: runtime,
    Genre: tmdbData.genres
      ? tmdbData.genres.map((genre) => genre.name).join(", ")
      : "Drama",
    Director: "N/A", 
    Writer: "N/A", 
    Actors: "N/A", 
    FullCast: [], 
    Plot: tmdbData.overview || "No description available",
    Language: tmdbData.original_language ? tmdbData.original_language.toUpperCase() : "Tamil",
    Country: "N/A", 
    Awards: "N/A",
    Poster: tmdbData.poster_path
      ? `${TMDB_CONFIG.imageBaseUrl}${tmdbData.poster_path}`
      : "https://via.placeholder.com/300x450/333/fff?text=No+Poster",
    imdbRating: tmdbData.vote_average
      ? tmdbData.vote_average.toFixed(1)
      : "N/A",
    imdbVotes: tmdbData.vote_count ? tmdbData.vote_count.toString() : "0",
    Type: type, 
    BoxOffice: "N/A",
    Production:
      tmdbData.production_companies &&
      tmdbData.production_companies.length > 0
        ? tmdbData.production_companies[0].name
        : "N/A",
    Trailer: null,
    Featured: tmdbData.vote_average > 7.5,
    Trending: tmdbData.popularity > 50,
    mediaType: mediaType
  };
};

// Enhanced trailer fetching function (unchanged)
const getTrailerUrl = (videos) => {
  if (!videos || !videos.results || videos.results.length === 0) return null;

  const officialTrailer = videos.results.find(
    (video) =>
      video.type === "Trailer" && video.site === "YouTube" && video.official
  );

  const anyTrailer = videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const teaser = videos.results.find(
    (video) => video.type === "Teaser" && video.site === "YouTube"
  );

  const firstVideo = videos.results.find((video) => video.site === "YouTube");

  const selectedVideo = officialTrailer || anyTrailer || teaser || firstVideo;

  return selectedVideo
    ? `https://www.youtube.com/embed/${selectedVideo.key}`
    : null;
};

// Fetch movie/series details including cast and crew
const fetchMovieDetails = async (id, mediaType) => {
  const endpoint = mediaType === 'tv' ? 'tv' : 'movie';
  try {
    const response = await fetch(
      `${TMDB_CONFIG.baseUrl}/${endpoint}/${id}?api_key=${TMDB_CONFIG.apiKey}&append_to_response=credits,videos`
    );

    if (!response.ok) throw new Error(`Failed to fetch ${endpoint} details`);

    const data = await response.json();
    data.media_type = endpoint; 
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} details:`, error);
    return null;
  }
};

// Fetch only trailers for better performance
const fetchMovieTrailer = async (id, mediaType) => {
  const endpoint = mediaType === 'tv' ? 'tv' : 'movie';
  try {
    const response = await fetch(
      `${TMDB_CONFIG.baseUrl}/${endpoint}/${id}/videos?api_key=${TMDB_CONFIG.apiKey}`
    );

    if (!response.ok) throw new Error("Failed to fetch trailer");

    const data = await response.json();
    return getTrailerUrl(data);
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to process credits and format them for the unified movie object
const processCredits = (details) => {
    const credits = {};
    if (details.credits) {
        const director = details.credits.crew.find(
            (person) => person.job === "Director"
        );
        credits.Director = director ? director.name : "N/A";
        
        credits.Writer = details.credits.crew.filter(
            (person) => person.job === "Screenplay" || person.job === "Writer"
        ).map(p => p.name).slice(0, 3).join(', ') || "N/A";
        
        // Create structured cast data (top 10 with images)
        const fullCast = details.credits.cast
            .filter(actor => actor.profile_path)
            .slice(0, 10) 
            .map(actor => ({
                id: actor.id,
                name: actor.name,
                character: actor.character,
                profilePath: `${TMDB_CONFIG.imageBaseUrl}${actor.profile_path}`
            }));

        // For backward compatibility (search bar/card info)
        credits.Actors = fullCast.slice(0, 5).map(a => a.name).join(", ");
        credits.FullCast = fullCast; 
    }
    return credits;
};

// Main search function (unchanged)
export const searchMovies = async (query) => {
  await delay(300);

  // 1. Perform initial local search
  const localFilteredMovies = query
    ? allMovies.filter(
        (movie) =>
          movie.Poster &&
          !movie.Poster.includes("No+Poster") &&
          ((movie.Title &&
            movie.Title.toLowerCase().includes(query.toLowerCase())) ||
            (movie.Director &&
              movie.Director.toLowerCase().includes(query.toLowerCase())) ||
            (movie.Actors &&
              movie.Actors.toLowerCase().includes(query.toLowerCase())) ||
            (movie.Genre &&
              movie.Genre.toLowerCase().includes(query.toLowerCase())))
      )
    : [];

  const localIds = new Set(localFilteredMovies.map((m) => m.imdbID));

  let finalMovies = [...localFilteredMovies];
  let totalResults = localFilteredMovies.length;

  try {
    let url;

    if (!query || query.trim() === "") {
      url = `${TMDB_CONFIG.baseUrl}/trending/all/day?api_key=${TMDB_CONFIG.apiKey}&page=1`;
    } else {
      url = `${TMDB_CONFIG.baseUrl}/search/multi?api_key=${
        TMDB_CONFIG.apiKey
      }&query=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch content from API");

    const data = await response.json();
    const mediaResults = data.results.filter(
      (item) => item.media_type === 'movie' || item.media_type === 'tv'
    );
    
    const moviesToProcess = mediaResults.slice(0, 15); 
    const apiMoviesWithDetails = [];

    for (const item of moviesToProcess) {
      try {
        const tempId = item.id.toString();
        if (localIds.has(tempId)) {
          continue;
        }

        const mediaType = item.media_type;
        const details = await fetchMovieDetails(item.id, mediaType);
        if (!details) continue;

        const formattedMovie = formatMovieData(details);
        if (formattedMovie.Poster.includes("No+Poster")) {
          continue;
        }

        // Apply Credits
        const credits = processCredits(details);
        formattedMovie.Director = credits.Director;
        formattedMovie.Writer = credits.Writer;
        formattedMovie.Actors = credits.Actors; 
        formattedMovie.FullCast = credits.FullCast;
        
        formattedMovie.Trailer = getTrailerUrl(details.videos);

        apiMoviesWithDetails.push(formattedMovie);
      } catch (error) {
        console.error(`Error processing item ${item.id}:`, error);
      }
    }

    finalMovies = [...finalMovies, ...apiMoviesWithDetails];
    totalResults = finalMovies.length;

    return {
      movies: finalMovies,
      totalResults: totalResults,
    };
  } catch (error) {
    console.error("Error searching content (API failed):", error);

    return {
      movies: finalMovies,
      totalResults: finalMovies.length,
    };
  }
};

// Get individual movie/series details with enhanced cast fetching for local entries
export const getMovieDetails = async (imdbID) => {
  await delay(200);

  // 1. Get local movie object
  const localMovie = allMovies.find((movie) => movie.imdbID === imdbID);
  
  // 2. Determine API ID and media type
  let apiId = parseInt(imdbID);
  let mediaType = 'movie'; // Default to movie

  if (isNaN(apiId)) {
    // This is a local movie ID (e.g., "tt1"). Check the map.
    const mappedId = LOCAL_ID_TO_TMDB_MAP[imdbID];
    if (mappedId) {
        apiId = mappedId;
    } else {
        // Not a mapped local ID, return local data if exists
        return localMovie || null;
    }
  }

  // Use local type as hint if available
  if (localMovie && localMovie.Type === 'series') {
      mediaType = 'tv';
  }
  
  try {
    let details = null;

    // 3. Try fetching with the determined ID and media type
    details = await fetchMovieDetails(apiId, mediaType);
    
    // 4. If first attempt fails (e.g., movie was a TV series or vice versa), try the other type
    if (!details) {
        const otherMediaType = mediaType === 'movie' ? 'tv' : 'movie';
        details = await fetchMovieDetails(apiId, otherMediaType);
        if (details) mediaType = otherMediaType; // Update type if found
    }

    if (!details) throw new Error("Content not found on TMDB");
    
    details.media_type = mediaType; 

    // 5. Format and process detailed credits
    const formattedMovie = formatMovieData(details);
    const credits = processCredits(details);
    formattedMovie.FullCast = credits.FullCast; // Populate FullCast from API
    formattedMovie.Trailer = getTrailerUrl(details.videos);
    
    // 6. Combine with local data, explicitly overwriting key API-fetched fields
    if (localMovie) {
        return { 
          ...localMovie, 
          // Overwrite local fields with richer, fetched data:
          Director: credits.Director,
          Writer: credits.Writer,
          Actors: credits.Actors, 
          FullCast: credits.FullCast, // <-- THE CRITICAL FIX: Overwrite local FullCast with API data
          Trailer: formattedMovie.Trailer,
          // Update derived fields from API for consistency:
          Title: formattedMovie.Title, 
          Year: formattedMovie.Year,
          Language: formattedMovie.Language,
          imdbRating: formattedMovie.imdbRating,
          imdbVotes: formattedMovie.imdbVotes,
          Type: formattedMovie.Type,
          Production: formattedMovie.Production,
        };
    }
    
    return formattedMovie;
  } catch (error) {
    console.error("Error fetching content details:", error);

    // 7. Return local fallback on API error
    return localMovie || null;
  }
};

// Separate function to fetch trailer only (unchanged)
export const getMovieTrailer = async (imdbID) => {
    const localMovie = allMovies.find((movie) => movie.imdbID === imdbID);
    let mediaType = localMovie && localMovie.Type === 'series' ? 'tv' : 'movie'; 
    let apiId = parseInt(imdbID);

    if (isNaN(apiId)) {
        const mappedId = LOCAL_ID_TO_TMDB_MAP[imdbID];
        if (mappedId) {
            apiId = mappedId;
        } else {
            return null; // Cannot find API ID for trailer
        }
    }

    try {
        let trailerUrl = await fetchMovieTrailer(apiId, mediaType);

        if (!trailerUrl) {
            const otherMediaType = mediaType === 'movie' ? 'tv' : 'movie';
            trailerUrl = await fetchMovieTrailer(apiId, otherMediaType);
        }

        return trailerUrl;
    } catch (error) {
        console.error("Error fetching trailer:", error);
        return null;
    }
};