import React from 'react';
import '../css/navbar.css';
import DarkModeAnimation from './DarkModeAnimation';
import websiteLogo from '/vite.svg';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar({ isDark, isAnimating, toggleDark, toggleLan, isEng }) {
  const navigate = useNavigate();

  // Log out function to clear tokens and navigate to home
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const isLoggedIn = localStorage.getItem('access_token') !== null;

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
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/canvas">Canvas</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <Link to="/user" className="btn btn-outline-light auth-button me-2">User</Link>
                <button
                  className="btn btn-outline-light auth-button me-2"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="btn btn-outline-light auth-button me-2">Log In</button>
              </Link>
            )}

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

          </div>

        </div>
      </nav>
    </header>
  );
}
