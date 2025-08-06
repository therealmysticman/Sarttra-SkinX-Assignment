import React from 'react';
import './styles/Header.css';
import logo from '../assets/images/S__76038209-1024x723.png';

function Header({ isLoggedIn, onLogout }) {
  return (
    <header>
      <div className="logo-container">
        <img src={logo} alt="SkinX Logo" className="logo" />
      </div>
      {isLoggedIn && (
        <div className="user-info">
          <span>Welcome, User!</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}

export default Header;