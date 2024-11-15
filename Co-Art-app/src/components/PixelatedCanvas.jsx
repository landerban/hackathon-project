import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Stage, Layer, Rect } from 'react-konva';
import VerticalColorBar from './VerticalColorBar';
import ScreenshotButton from './ScreenshotButton';
import '../css/PixelatedCanvas.css';
import defaultBackground from '../assets/react.svg';


const PixelatedCanvas = ({ width, height, gridCount, colorPalette}) => {
  const pixelSize = width / gridCount;
  const [pixels, setPixels] = useState({});
  const [canvasId, setCanvasId] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(""); // State for background image URL
  const [clickDisabled, setClickDisabled] = useState(false);
  const [intervalTrigger, setIntervalTrigger] = useState(0); // Trigger state for intervals

  // Retrieve the time_duration from localStorage
  const time_duration = parseInt(localStorage.getItem('time_duration') || '2000', 10) * 1000;
  console.log(`time_duration set to: ${time_duration} ms`);


  useEffect(() => {
    // Fetch color palette and background image from the API
    axios
      .get('http://127.0.0.1:8000/canvas/api/get_canvas')
      .then((response) => {
        const backgroundImagePath = response.data.background_image;

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

  // Fetch pixel data from API whenever intervalTrigger changes
  useEffect(() => {
    console.log("Fetching pixel data from API...");
    axios
      .get('http://127.0.0.1:8000/canvas/api/get_placements')
      .then((response) => {
        const placements = response.data;
        console.log("API response:", placements);

        if (placements.length > 0) {
          setCanvasId(placements[0].canvas_id);
        }

        const pixelData = {};
        placements.forEach(({ pixel_x, pixel_y, pixel_color }) => {
          const key = `${pixel_x}-${pixel_y}`;
          pixelData[key] = pixel_color;
        });
        setPixels(pixelData);
      })
      .catch((error) => {
        console.error('Error fetching pixel placements:', error);
      });
  }, [intervalTrigger]); // Depend on intervalTrigger

  // Timeout to change intervalTrigger at intervals of time_duration
  useEffect(() => {
    console.log("Setting timeout with time_duration:", 3000);
    const timeout = setTimeout(() => {
      console.log("Timeout reached, updating intervalTrigger...");
      setIntervalTrigger((prev) => prev + 1); // Update trigger to re-run API call
    }, 10000);

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, [intervalTrigger, time_duration]); // Restart timeout when intervalTrigger or time_duration changes

  const handlePixelClick = useCallback((colIndex, rowIndex) => {
    if (clickDisabled) return; // Prevent clicking if disabled

    const key = `${colIndex}-${rowIndex}`;
    const newColor = selectedColor;

    setPixels((prevPixels) => ({
      ...prevPixels,
      [key]: newColor,
    }));

    if (1) {
      console.log("Posting pixel data:", { colIndex, rowIndex, newColor });
      axios
        .post('http://127.0.0.1:8000/canvas/api/place', {
          canvas_id: 1,
          pixel_x: colIndex,
          pixel_y: rowIndex,
          pixel_color: newColor,
          placed_by: localStorage.getItem("id"),
        })
        .then((response) => {
          console.log('Pixel data successfully posted:', response.data);
          setClickDisabled(true); // Disable click after posting
          
          // Re-enable click after the time_duration
          setTimeout(() => {
            setClickDisabled(false);
          }, time_duration);
        })
        .catch((error) => {
          console.error('Error posting pixel data:', error);
        });
    } else {
      console.error('Canvas ID is not available');
    }
  }, [canvasId, selectedColor, clickDisabled, time_duration]);

  
  return (
    
    <div className="pixelated-canvas-container">
      <div className="color-bar-container">
        <VerticalColorBar selectedColor={selectedColor} onColorSelect={setSelectedColor} colorPalette={colorPalette} />
        <ScreenshotButton className="canvas" />
      </div>

      <div
        className="canvas canvas-stage-container"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adds transparency to the background color
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Stage className="drawing-canvas" width={width} height={height}>
          <Layer>
            {Array.from({ length: gridCount }).map((_, rowIndex) =>
              Array.from({ length: gridCount }).map((_, colIndex) => {
                const x = colIndex * pixelSize;
                const y = rowIndex * pixelSize;
                const key = `${colIndex}-${rowIndex}`;
                const fill = pixels[key] || 'white'; // Set default color to white

                return (
                  <Rect
                    key={key}
                    x={x}
                    y={y}
                    width={pixelSize}
                    height={pixelSize}
                    fill={fill}
                    stroke="#cccccc"
                    strokeWidth={1}
                    onClick={() => handlePixelClick(colIndex, rowIndex)}
                  />
                );
              })
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default PixelatedCanvas;
