import React from 'react';
import '../css/MotoPage.css';
import About_Us_bg from '../assets/About_Us_bg.png';


const MotoPage = () => {
  return (
    <div className="moto-page" style={{ backgroundImage: `url(${About_Us_bg})` }}>
      <div className="background"></div>

      {/* Top Left Card */}
      <div className="card top-left">
        <h2>MOTO</h2>
        <p>
          This website was created by a team of enthusiastic students for a
          hackathon with the theme of Art. Our concept combines traditional
          elements with innovative modern flair. With an emphasis on creating
          a unique experience, we worked for several weeks, each member
          with a clear vision and objectives in their designated roles. Would
          you find this project inspiring, or even complex? Hopefully, it
          does. Working together, we created the artwork to represent the
          merged ideas, showcasing a journey where traditional art meets
          something entirely new and original.
        </p>
      </div>

      {/* Bottom Right Card */}
      <div className="card bottom-right">
        <h2>Members</h2>
        <ul>
          <li>김지은 - Backend</li>
          <li>김태연 - Frontend</li>
          <li>윤호 - Backend</li>
          <li>준혁 - Frontend</li>
          <li>민우 - Frontend</li>
          <li>김동현 - Backend</li>
          <li>정혜린 - Backend</li>
          <li>정현 - Team Lead/Design</li>
        </ul>
      </div>
    </div>
  );
};

export default MotoPage;
