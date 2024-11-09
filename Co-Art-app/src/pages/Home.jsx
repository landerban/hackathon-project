import React from 'react';
import About_Us_bg from '../assets/main-page_background.png';
import '../css/Home.css'; // Import the CSS file

export const Home = () => {
  return (
    <div className="home-container">
      <img src={About_Us_bg} alt="Background" className="background-image" />
      <div className="content">
        <h1>Welcome to the Place Where Traditional Meets Modern</h1>
      </div>
    </div>
  );
};

export default Home;
