export const TMDB_CONFIG = {
      apiKey: import.meta.env.VITE_TMDB_API_KEY || 'YOUR_TMDB_API_KEY',

  apiKey: 'e79d8cb91da22840b1ca865b87e709f5', // Get from https://www.themoviedb.org/settings/api
  baseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
  backdropBaseUrl: 'https://image.tmdb.org/t/p/w1280'
};

// Tamil language code and region for filtering
export const TAMIL_CONFIG = {
  language: 'ta', // Tamil
  region: 'IN' // India
};
