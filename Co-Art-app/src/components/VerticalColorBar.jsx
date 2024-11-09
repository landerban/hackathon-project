// VerticalColorBar.js
import React from 'react';
import '../css/VerticalColorBar.css';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF', '#FFA500', '#00CED1', '#FF4500'];

const VerticalColorBar = ({ selectedColor, onColorSelect , colorPalette}) => {
  return (
    <div className="vertical-color-bar">
      {colorPalette.map((color) => (
        <div
          key={color}
          onClick={() => onColorSelect(color)}
          className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
          style={{
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default VerticalColorBar;
