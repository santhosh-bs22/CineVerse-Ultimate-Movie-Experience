import React, { useState, useEffect } from "react";

// Accept onNavClick and activeSection as props
const Header = ({ onNavClick, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Centralized handler using the prop function
  const handleNavClick = (section) => {
    closeMenu();
    onNavClick(section);
  };

  // Helper functions for dynamic active class logic
  const isHomeActive =
    activeSection === "home" || activeSection === "featured";
  const isMoviesActive =
    activeSection === "all" || activeSection === "search";
  const isLanguagesActive =
    activeSection === "tamil" ||
    activeSection === "english" ||
    activeSection === "telugu" ||
    activeSection === "languages-filter";

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🎬</div>
            <div>
              <h1 className="logo-text">CineVerse</h1>
              <span className="logo-subtitle">Multi-Language Cinema</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <a
                  href="#home"
                  className={`nav-link ${isHomeActive ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("home");
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#movies"
                  className={`nav-link ${isMoviesActive ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("movies");
                  }}
                >
                  Movies
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#trending"
                  className={`nav-link ${
                    activeSection === "trending" ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("trending");
                  }}
                >
                  Trending
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#upcoming"
                  className={`nav-link ${
                    activeSection === "upcoming" ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("upcoming");
                  }}
                >
                  Upcoming
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#languages"
                  className={`nav-link ${isLanguagesActive ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("languages");
                  }}
                >
                  Languages
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`mobile-nav-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      >
        <nav
          className={`mobile-nav ${isMenuOpen ? "active" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-nav-header">
            <div className="mobile-logo">
              <span className="logo-icon">🎬</span>
              <span className="logo-text">CineVerse</span>
            </div>
            <button className="close-menu" onClick={closeMenu}>
              ×
            </button>
          </div>

          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <a
                href="#home"
                className={`mobile-nav-link ${isHomeActive ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("home");
                }}
              >
                <span className="nav-icon">🏠</span>
                Home
              </a>
            </li>
            <li className="mobile-nav-item">
              <a
                href="#movies"
                className={`mobile-nav-link ${isMoviesActive ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("movies");
                }}
              >
                <span className="nav-icon">🎬</span>
                Movies
              </a>
            </li>
            <li className="mobile-nav-item">
              <a
                href="#trending"
                className={`mobile-nav-link ${
                  activeSection === "trending" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("trending");
                }}
              >
                <span className="nav-icon">🔥</span>
                Trending
              </a>
            </li>
            <li className="mobile-nav-item">
              <a
                href="#upcoming"
                className={`mobile-nav-link ${
                  activeSection === "upcoming" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("upcoming");
                }}
              >
                <span className="nav-icon">📅</span>
                Upcoming
              </a>
            </li>
            <li className="mobile-nav-item">
              <a
                href="#languages"
                className={`mobile-nav-link ${
                  isLanguagesActive ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("languages");
                }}
              >
                <span className="nav-icon">🌍</span>
                Languages
              </a>
            </li>
            <li className="mobile-nav-item">
              <a
                href="#search"
                className={`mobile-nav-link ${
                  activeSection === "search" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("movies");
                }}
              >
                <span className="nav-icon">🔍</span>
                Search
              </a>
            </li>
          </ul>

          <div className="mobile-nav-footer">
            <div className="language-badges">
              <span className="lang-badge">🎭 Tamil</span>
              <span className="lang-badge">🎬 English</span>
              <span className="lang-badge">✨ Telugu</span>
            </div>
          </div>
        </nav>
      </div>

      <style jsx>{`
        /* Header Styles */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(20px);
          padding: 1rem 0;
          z-index: 1000;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .header.scrolled {
          background: rgba(18, 18, 18, 0.98);
          border-bottom-color: #ff6b6b;
          padding: 0.8rem 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Logo */
        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .logo-text {
          color: #ff6b6b;
          font-size: 1.6rem;
          font-weight: bold;
        }

        .logo-subtitle {
          color: #b0b0b0;
          font-size: 0.9rem;
          display: block;
        }

        /* Desktop Nav */
        .desktop-nav {
          display: flex;
        }

        .nav-list {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: #fff;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-link.active {
          color: #ff6b6b;
        }

        .nav-link:hover {
          color: #ff6b6b;
        }

        /* underline for desktop */
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #ff6b6b;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        /* Hamburger Button */
        .menu-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .toggle-bar {
          width: 25px;
          height: 3px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .menu-toggle.active .toggle-bar:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .menu-toggle.active .toggle-bar:nth-child(2) {
          opacity: 0;
        }
        .menu-toggle.active .toggle-bar:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* Mobile Nav Overlay */
        .mobile-nav-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 999;
        }
        .mobile-nav-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* Mobile Nav */
        .mobile-nav {
          position: fixed;
          top: 0;
          right: -100%;
          width: 280px;
          height: 100%;
          background: #1a1a1a;
          border-left: 2px solid #ff6b6b;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav.active {
          right: 0;
        }

        .mobile-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ff6b6b;
          font-weight: bold;
        }

        .close-menu {
          background: none;
          border: none;
          color: #fff;
          font-size: 2rem;
          cursor: pointer;
        }

        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;
        }

        .mobile-nav-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem;
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .mobile-nav-link.active {
          color: #ff6b6b;
          background: none !important;
        }
        .mobile-nav-link:hover {
          color: #ff6b6b;
          background: none !important;
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .mobile-nav-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .language-badges {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .lang-badge {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem;
          border-radius: 20px;
          text-align: center;
          font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .menu-toggle {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
