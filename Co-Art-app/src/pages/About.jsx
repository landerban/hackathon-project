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
        <h2>About</h2>
        <p>
          In a world where many people’s lives are routine-driven and task-oriented, Convas offers a fun and simple way to tap into creativity daily. Even those without traditional art skills can contribute to something visually appealing, making creativity accessible to all.

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
