import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">🎬❌</div>
          <h1 className="error-title">Oops! Page Not Found</h1>
          <p className="error-message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="error-details">
            <p>
              <strong>Error:</strong> 404 Page Not Found
            </p>
            <p>
              <strong>Status:</strong> 404
            </p>
          </div>
          <div className="error-actions">
            <Link to="/" className="error-button primary">
              🏠 Go Home
            </Link>
            <Link to="/movies" className="error-button secondary">
              🎬 Browse Movies
            </Link>
            <button 
              onClick={() => navigate(-1)} 
              className="error-button tertiary"
            >
              ↩️ Go Back
            </button>
          </div>
        </div>
        
        <div className="error-featured">
          <h3>While you're here, check out these popular Tamil movies:</h3>
          <div className="error-movie-suggestions">
            {['Vikram', 'Master', 'Jai Bhim', 'Kaithi', 'PS-1', 'Asuran'].map((movie, index) => (
              <span key={index} className="movie-tag">
                {movie}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .error-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: white;
          font-family: 'Poppins', sans-serif;
        }

        .error-container {
          max-width: 600px;
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .error-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }

        .error-title {
          font-size: 2.5rem;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .error-message {
          font-size: 1.2rem;
          color: #b0b0b0;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .error-details {
          background: rgba(255, 107, 107, 0.1);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 30px;
          border-left: 4px solid #ff6b6b;
        }

        .error-details p {
          margin: 5px 0;
          color: #ff6b6b;
        }

        .error-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .error-button {
          padding: 12px 24px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .error-button.primary {
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          color: white;
        }

        .error-button.secondary {
          background: transparent;
          border: 2px solid #4ecdc4;
          color: #4ecdc4;
        }

        .error-button.tertiary {
          background: transparent;
          border: 2px solid #ffd166;
          color: #ffd166;
        }

        .error-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .error-featured {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 30px;
        }

        .error-featured h3 {
          color: #4ecdc4;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }

        .error-movie-suggestions {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .movie-tag {
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .movie-tag:hover {
          background: rgba(255, 107, 107, 0.3);
          transform: scale(1.05);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .error-container {
            padding: 30px 20px;
            margin: 20px;
          }
          
          .error-title {
            font-size: 2rem;
          }
          
          .error-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .error-button {
            width: 200px;
            justify-content: center;
          }
          
          .error-movie-suggestions {
            gap: 8px;
          }
          
          .movie-tag {
            padding: 6px 12px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .error-container {
            padding: 20px 15px;
          }
          
          .error-title {
            font-size: 1.8rem;
          }
          
          .error-icon {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;