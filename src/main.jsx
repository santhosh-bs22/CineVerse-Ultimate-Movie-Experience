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
        {/* FIX: Use '/*' to match the base path and all sub-paths 
            This ensures the App loads correctly on initial deploy (e.g., /samplesearch2/) 
        */}
        <Route path="/*" element={<App />} />
        
        {/* The '*' route catches anything else, leading to the ErrorPage */}
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