import React from 'react';

const MobileMenu = ({ isOpen, onClose, onSectionChange, activeSection }) => {
  if (!isOpen) return null;

  const menuItems = [
    { key: 'featured', label: '⭐ Featured', icon: '⭐' },
    { key: 'trending', label: '🔥 Trending', icon: '🔥' },
    { key: 'all', label: '🎬 All Movies', icon: '🎬' },
    { key: 'search', label: '🔍 Search', icon: '🔍' }
  ];

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <h3>MovieHub Menu</h3>
          <button className="close-menu" onClick={onClose}>×</button>
        </div>
        
        <nav className="mobile-nav">
          {menuItems.map(item => (
            <button
              key={item.key}
              className={`mobile-nav-item ${activeSection === item.key ? 'active' : ''}`}
              onClick={() => onSectionChange(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="mobile-menu-footer">
          <p>🎬 Tamil Cinema Universe</p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;