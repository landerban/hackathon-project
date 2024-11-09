import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stage, Layer, Rect } from 'react-konva';

const PixelatedCanvas = ({ width, height, gridCount }) => {
  const pixelSize = width / gridCount;
  const [pixels, setPixels] = useState({});
  const [canvasId, setCanvasId] = useState(null); // State to store canvas ID from API

  // Fetch initial data from the API when the component mounts
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/canvas/api/get_placements')
      .then((response) => {
        const placements = response.data;
        
        // Extract canvas ID from the first item in the response
        if (placements.length > 0) {
          setCanvasId(placements[0].canvas_id);
        }

        // Map the response data into the pixels state
        const pixelData = {};
        placements.forEach(({ pixel_x, piexl_y, pixel_color }) => {
          const key = `${pixel_x}-${piexl_y}`;
          pixelData[key] = pixel_color;
          console.log(`Pixel at (${pixel_x}, ${piexl_y}) with color ${pixel_color}`);
        });
        setPixels(pixelData);
      })
      .catch((error) => {
        console.error('Error fetching pixel placements:', error);
      });
  }, []);

  // Handle pixel click to toggle color and post the data to the API
  const handlePixelClick = (colIndex, rowIndex) => {
    const key = `${colIndex}-${rowIndex}`;
    const newColor = pixels[key] ? null : '#000000';

    setPixels((prevPixels) => ({
      ...prevPixels,
      [key]: newColor, // Toggle between black and transparent (null)
    }));

    // Ensure canvasId is available before posting
    if (canvasId !== null) {
      // Send the new pixel data to the API
      axios
        .post('http://127.0.0.1:8000/canvas/api/place', {
          canvas_id: canvasId,
          pixel_x: colIndex,
          pixel_y: rowIndex,
          pixel_color: newColor || '#ffffff', // Send white if color is null
        })
        .then((response) => {
          console.log('Pixel data successfully posted:', response.data);
        })
        .catch((error) => {
          console.error('Error posting pixel data:', error);
        });
    } else {
      console.error('Canvas ID is not available');
    }
  };

  return (
    <div>
      <Stage width={width} height={height} style={{ background: 'transparent' }}>
        <Layer>
          {/* Render grid and pixels */}
          {Array.from({ length: gridCount }).map((_, rowIndex) =>
            Array.from({ length: gridCount }).map((_, colIndex) => {
              const x = colIndex * pixelSize;
              const y = rowIndex * pixelSize;
              const key = `${colIndex}-${rowIndex}`;
              const fill = pixels[key] || 'transparent';

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
  );
};

export default PixelatedCanvas;
