# 🔥 Project Kollywood: Your Ultimate Tamil Movie Destination

## Experience Tamil Cinema Like Never Before

**MovieHub** is the go-to platform for discovering and exploring the world of Kollywood (Tamil cinema). Built on **React** with a high-performance **Vite** setup, this application is designed for speed, style, and comprehensive movie details.

---

## 🎬 Website Content Highlights

The application is a rich database of Tamil movies, powered by an integration with The Movie Database (TMDB) API, with a fallback to high-quality local data for seamless viewing.

| Content Item | Description | Source / Details |
| :--- | :--- | :--- |
| **Vast Movie Catalog** | An extensive collection of over **200+ Tamil Movies** (or more with the live API). | TMDB API / Local Data |
| **Real-time Ratings** | Live IMDb ratings and user votes for accurate popular opinion. | TMDB API |
| **High-Quality Media** | Official posters and backdrops are available. | TMDB Image Base URL |
| **Key Movie Data** | Detailed information including plot synopsis, year, runtime, genre, director, and lead actors. | Data structure in `src/data/tamilMovies.js` |
| **Demo Movies** | Includes popular entries like *Vikram*, *Master*, *Ponniyin Selvan: Part 1*, and *Jai Bhim* for local testing. |
---

## ✨ Core Features

MovieHub is engineered for an intuitive and enjoyable user experience across all devices.

### 🔍 Discovery & Search

* **Instant Search:** Find movies instantly by typing in the **title, cast, or director**.
* **Curated Sections:** Easily navigate through pre-filtered views: **Featured**, **Trending**, and **All Movies**.
* **Random Suggestion:** A 'Random Movie' button in the search bar allows for fun, serendipitous movie discovery.

### 📺 Playback & Details

* **Embedded Trailers:** Every movie includes an embedded **YouTube trailer** that can be played via a dedicated button on the movie card.
* **Trailer Modal:** A custom modal interface ensures an immersive, distraction-free trailer viewing experience.
* **Multi-Tab Details:** The dedicated **Movie Details Modal** organizes information into tabs for **Storyline, Cast & Crew, Technical details, and Awards** for in-depth research.

### 📱 Design & Performance

* **Mobile-First Layout:** The entire application is optimized for small screens, providing a consistent experience on all devices.
* **Cinematic Dark Theme:** A visually stunning, custom dark theme with Netflix-inspired color accents (`--primary: #e50914`).
* **Smooth Animations:** Utilizes subtle CSS transitions and effects for UI elements, including animated movie cards on hover and content loading.
* **Dynamic Particles Background:** A custom React component adds a subtle, floating particle effect for a modern aesthetic.