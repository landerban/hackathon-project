import React from 'react';
import '../css/navbar.css';
import DarkModeAnimation from './DarkModeAnimation';
import websiteLogo from '/vite.svg';
import { Link } from 'react-router-dom';

export default function NavBar({ isDark, isAnimating, toggleDark, toggleLan, isEng }) {
  return (
    <header className={isDark ? 'dark' : ''}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-light-custom px-3">
        <Link className="navbar-brand" to="/">
          <img src={websiteLogo} alt="Profile Icon" className="profile-icon" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chats">Chats</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link to='/register'><button className="btn btn-outline-light auth-button me-2">Log In</button></Link>

            {/* Dark Mode Toggle Button */}
            <button
              className="btn btn-outline-light dark-mode me-2"
              onClick={toggleDark}
              disabled={isAnimating} // Disable button during animation
            >
              {isDark ? 'D' : 'L'}
            </button>

            {/* Overlay Animation */}
            <DarkModeAnimation isAnimating={isAnimating} isDark={isDark} />

            {/* Language Toggle Button */}
            <button
              className="btn btn-outline-light auth-button me-2"
              onClick={toggleLan}
            >
              {isEng ? 'Eng' : 'Kor'}
            </button>
          </div>

        </div>
      </nav>
    </header>
  );
}
