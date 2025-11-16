// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ cartItemCount, overallInventoryValue, onViewChange }) {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 15px',
    border: '1px solid #555',
    borderRadius: '4px',
    marginLeft: '10px',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  };
  
  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = '#555';
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <header style={headerStyle}>
      <h1 style={{ margin: 0, fontSize: '1.5em' }}>🛍️ Inventory Manager</h1>

      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <Link 
          to="/" 
          onClick={() => onViewChange('products')}
          style={navLinkStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Home (Products)
        </Link>
        
        <Link 
          to="/" 
          onClick={() => onViewChange('cart')}
          style={navLinkStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Cart ({cartItemCount})
        </Link>
      </nav>

      <h2 style={{ margin: 0, fontSize: '1em' }}>
         Total Value: ₱{overallInventoryValue.toFixed(2)}
      </h2>
    </header>
  );
}

export default Header;