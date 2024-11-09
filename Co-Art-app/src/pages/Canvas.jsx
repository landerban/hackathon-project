import React from 'react';
import PixelatedCanvas from '../components/PixelatedCanvas';
import '../css/Canvas.css';

const Canvas = () => {
  return (
    <div className="canvas-container">
      <div className="canvas-content">
        <PixelatedCanvas width={1000} height={1000} gridCount={100} />
        <h1>Credit to :</h1>
      </div>
      
    </div>
  );
};

export default Canvas;
