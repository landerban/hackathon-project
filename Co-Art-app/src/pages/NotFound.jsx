import React from 'react';
import '../css/404Page.css';
import { useNavigate } from 'react-router-dom';

function NotFound({ isDark }) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className={`not-found-container ${isDark ? "dark" : ""} d-flex flex-column justify-content-center align-items-center vh-100`}>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div className="error-illustration d-flex justify-content-center align-items-center">
              <div className="number">4</div>
              <div className="circle"></div>
              <div className="number">0</div>
              <div className="square"></div>
              <div className="number">4</div>
            </div>
            <h1 className="display-4 mt-3">Oops, page not found!</h1>
            <button className="btn btn-primary mt-4" onClick={goToHome}>Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
    