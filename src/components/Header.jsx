import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (section) => {
    closeMenu();
    // Scroll to section logic can be added here
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
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
                <a href="#home" className="nav-link" onClick={() => handleNavClick('home')}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#movies" className="nav-link" onClick={() => handleNavClick('movies')}>
                  Movies
                </a>
              </li>
              <li className="nav-item">
                <a href="#trending" className="nav-link" onClick={() => handleNavClick('trending')}>
                  Trending
                </a>
              </li>
              <li className="nav-item">
                <a href="#upcoming" className="nav-link" onClick={() => handleNavClick('upcoming')}>
                  Upcoming
                </a>
              </li>
              <li className="nav-item">
                <a href="#languages" className="nav-link" onClick={() => handleNavClick('languages')}>
                  Languages
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
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
      <div className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
        <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="mobile-nav-header">
            <div className="mobile-logo">
              <span className="logo-icon">🎬</span>
              <span className="logo-text">CineVerse</span>
            </div>
            <button className="close-menu" onClick={closeMenu}>×</button>
          </div>
          
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <a href="#home" className="mobile-nav-link" onClick={() => handleNavClick('home')}>
                <span className="nav-icon">🏠</span>
                Home
              </a>
            </li>
            <li className="mobile-nav-item">
              <a href="#movies" className="mobile-nav-link" onClick={() => handleNavClick('movies')}>
                <span className="nav-icon">🎬</span>
                Movies
              </a>
            </li>
            <li className="mobile-nav-item">
              <a href="#trending" className="mobile-nav-link" onClick={() => handleNavClick('trending')}>
                <span className="nav-icon">🔥</span>
                Trending
              </a>
            </li>
            <li className="mobile-nav-item">
              <a href="#upcoming" className="mobile-nav-link" onClick={() => handleNavClick('upcoming')}>
                <span className="nav-icon">📅</span>
                Upcoming
              </a>
            </li>
            <li className="mobile-nav-item">
              <a href="#languages" className="mobile-nav-link" onClick={() => handleNavClick('languages')}>
                <span className="nav-icon">🌍</span>
                Languages
              </a>
            </li>
            <li className="mobile-nav-item">
              <a href="#search" className="mobile-nav-link" onClick={() => handleNavClick('search')}>
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

        /* Logo Styles */
        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 1001;
        }

        .logo-icon {
          font-size: 2.5rem;
          animation: float 3s ease-in-out infinite;
        }

        .logo-text {
          color: #ff6b6b;
          font-size: 2rem;
          font-weight: bold;
          margin: 0;
        }

        .logo-subtitle {
          color: #b0b0b0;
          font-size: 0.9rem;
          display: block;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
        }

        .nav-list {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          padding: 0.5rem 0;
          position: relative;
          font-size: 1.1rem;
        }

        .nav-link:hover {
          color: #ff6b6b;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Mobile Menu Toggle */
        .menu-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 25px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }

        .toggle-bar {
          display: block;
          height: 3px;
          width: 100%;
          background: #ffffff;
          border-radius: 3px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .menu-toggle.active .toggle-bar:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .menu-toggle.active .toggle-bar:nth-child(2) {
          opacity: 0;
        }

        .menu-toggle.active .toggle-bar:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Mobile Navigation Overlay */
        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-nav-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* Mobile Navigation */
        .mobile-nav {
          position: fixed;
          top: 0;
          right: -100%;
          width: 300px;
          height: 100vh;
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          z-index: 1000;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
          border-left: 2px solid #ff6b6b;
        }

        .mobile-nav.active {
          right: 0;
        }

        .mobile-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ff6b6b;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .close-menu {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 2rem;
          cursor: pointer;
          padding: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;
        }

        .mobile-nav-item {
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 1.5rem;
          color: #ffffff;
          text-decoration: none;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
        }

        .nav-icon {
          font-size: 1.2rem;
          width: 20px;
          text-align: center;
        }

        .mobile-nav-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .language-badges {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .lang-badge {
          background: rgba(255,255,255,0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          text-align: center;
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        /* Media Queries */
        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }

          .desktop-nav {
            display: none;
          }

          .logo-text {
            font-size: 1.8rem;
          }

          .logo-icon {
            font-size: 2rem;
          }

          .logo-subtitle {
            font-size: 0.8rem;
          }

          .header-content {
            padding: 0 15px;
          }
        }

        @media (max-width: 480px) {
          .mobile-nav {
            width: 280px;
          }

          .logo-text {
            font-size: 1.6rem;
          }

          .logo-subtitle {
            display: none;
          }

          .header {
            padding: 0.8rem 0;
          }

          .mobile-nav-link {
            padding: 1.2rem 1.5rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 360px) {
          .mobile-nav {
            width: 100%;
          }

          .logo-text {
            font-size: 1.4rem;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .nav-link:hover {
            color: #ffffff;
          }

          .nav-link:hover::after {
            width: 0;
          }

          .mobile-nav-link:active {
            background: rgba(255, 107, 107, 0.2);
          }
        }
      `}</style>
    </>
  );
};

export default Header;