import React from "react";
import "../css/MotoPage.css";
import About_Us_bg from "../assets/About_Us_bg.png";

const MotoPage = () => {
  return (
    <div
      className="moto-page"
      style={{ backgroundImage: `url(${About_Us_bg})` }}
    >
      <div className="background"></div>

      {/* Top Left Card */}
      <div className="card top-left">
        <h2>MOTO</h2>
        <p>
          This website was created by a team of enthusiastic students for a
          hackathon with the theme of Art. Our concept is to see how users
          around the world can work together with their own limited resources.
          With an emphasis on creating a unique experience, we worked for
          several weeks, each member with a clear vision and objectives in their
          designated roles. Would you find this project inspiring, or even
          complex? Hopefully, it does. Working together, we created the artwork
          to represent the merged ideas, showcasing a journey where white canvas
          meets something entirely new and original.
        </p>
      </div>

      {/* Bottom Right Card */}
      <div className="card bottom-right">
        <h2>Members</h2>
        <ul>
          <li>알렉스 - Team Lead/Design</li>
          <li>김진현 - Backend</li>
          <li>최원재 - Backend</li>
          <li>웨이얀 - Frontend</li>
          <li>이인경 - Frontend</li>
        </ul>
      </div>
    </div>
  );
};

export default MotoPage;
