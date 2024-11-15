import React, { useState, useEffect } from 'react';
import PixelatedCanvas from '../components/PixelatedCanvas';
import axios from 'axios';
import '../css/Canvas.css';

const Canvas = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Track if the data is loaded
  const [colorPalette, setColorPalette] = useState([]); // State for color palette
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(""); // State for background image URL

  useEffect(() => {
    // Fetch color palette and background image from the API
    axios
      .get('http://127.0.0.1:8000/canvas/api/get_canvas')
      .then((response) => {
        const palette = [
          response.data.color_pallette1,
          response.data.color_pallette2,
          response.data.color_pallette3,
          response.data.color_pallette4,
          response.data.color_pallette5,
          response.data.color_pallette6,
          response.data.color_pallette7,
          response.data.color_pallette8,
        ];
        setColorPalette(palette);

        const timeControl = response.data.time_control;
        const credits = response.data.credits;
        const backgroundImagePath = response.data.background_image;

        localStorage.setItem('credits', credits);
        localStorage.setItem('time_control', timeControl);

        // Prepend the backend base URL to the relative path
        const baseUrl = 'http://127.0.0.1:8000';
        const fullImageUrl = backgroundImagePath.startsWith('/media')
          ? `${baseUrl}${backgroundImagePath}`
          : backgroundImagePath;
          
        setBackgroundImageUrl(fullImageUrl); // Store the full URL in state
        setIsLoaded(true); // Mark as loaded once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching color palette:', error);
        setIsLoaded(true); // Mark as loaded even if there is an error
      });
  }, []);

  const credits = localStorage.getItem('credits') || "No Credits";
  const storedTimeControl = localStorage.getItem('time_control') || "default_mode";

  if (storedTimeControl === 'blitz') {
    localStorage.setItem('time_duration', 10);
  } else if (storedTimeControl === 'rapid') {
    localStorage.setItem('time_duration', 60);
  } else if (storedTimeControl === 'standard') {
    localStorage.setItem('time_duration', 1800);
  }

  const time_duration = localStorage.getItem('time_duration') || "default_time";

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="canvas-container">
      {storedTimeControl && time_duration && (
        <div className="mode-info">
          Mode: {storedTimeControl} <br />
          Time to Wait: {time_duration}
        </div>
      )}
      <div className="canvas-content">
        <PixelatedCanvas width={700} height={700} gridCount={80} colorPalette={colorPalette}/>
        {credits && credits !== "No Credits" && (
          <h1 className="credit-info">Credit to: {credits}</h1>
        )}

      </div>
    </div>
  );
};

export default Canvas;
