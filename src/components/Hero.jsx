import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }} className="fade-in-up">
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #ffd166, #ef476f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '300% 300%',
              animation: 'gradientShift 3s ease infinite'
            }}>
              CineVerse Universe
            </h1>
            <p style={{
              fontSize: '1.3rem',
              color: '#b0b0b0',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Explore the finest collection of multi-language movies - Tamil, English, Telugu - with trailers, 
              ratings, and detailed information. From blockbuster hits to critically acclaimed masterpieces.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button style={{
                padding: '12px 30px',
                background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                🎬 Explore Movies
              </button>
              <button style={{
                padding: '12px 30px',
                background: 'transparent',
                border: '2px solid #4ecdc4',
                borderRadius: '50px',
                color: '#4ecdc4',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#4ecdc4';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#4ecdc4';
              }}>
                ▶ Watch Trailers
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginTop: '4rem',
            flexWrap: 'wrap'
          , animationDelay: '0.5s' }} className="fade-in-up">
            {[
              { number: '200+', label: 'Movies' },
              { number: '8.2+', label: 'Avg Rating' },
              { number: '2025', label: 'Latest' },
              { number: '3', label: 'Languages' }
            ].map((stat, index) => (
              <div key={stat.label} style={{
                textAlign: 'center',
                animationDelay: `${0.7 + index * 0.1}s`
              }} className="fade-in-up">
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>{stat.number}</div>
                <div style={{ color: '#b0b0b0' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Language Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { lang: 'Tamil', emoji: '🎭', color: '#4ecdc4' },
              { lang: 'English', emoji: '🎬', color: '#ff6b6b' },
              { lang: 'Telugu', emoji: '✨', color: '#ffd166' }
            ].map((item, index) => (
              <div key={item.lang} style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '10px 20px',
                borderRadius: '25px',
                border: `2px solid ${item.color}`,
                backdropFilter: 'blur(10px)',
                animationDelay: `${1 + index * 0.2}s`
              }} className="fade-in-up">
                <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>{item.emoji}</span>
                <span style={{ color: item.color, fontWeight: 'bold' }}>{item.lang}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;