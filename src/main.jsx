import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage';
import './styles/App.css';

// Create main app component with routing
const AppWithRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movies" element={<App />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWithRoutes />
  </React.StrictMode>
);