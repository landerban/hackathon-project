import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stage, Layer, Rect } from 'react-konva';
import VerticalColorBar from './VerticalColorBar';
import ScreenshotButton from './ScreenshotButton';
import '../css/PixelatedCanvas.css';

const PixelatedCanvas = ({ width, height, gridCount }) => {
  const pixelSize = width / gridCount;
  const [pixels, setPixels] = useState({});
  const [canvasId, setCanvasId] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default color for drawing

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/canvas/api/get_placements')
      .then((response) => {
        const placements = response.data;

        if (placements.length > 0) {
          setCanvasId(placements[0].canvas_id);
        }

        const pixelData = {};
        placements.forEach(({ pixel_x, piexl_y, pixel_color }) => {
          const key = `${pixel_x}-${piexl_y}`;
          pixelData[key] = pixel_color;
        });
        setPixels(pixelData);
      })
      .catch((error) => {
        console.error('Error fetching pixel placements:', error);
      });
  }, []);

  const handlePixelClick = (colIndex, rowIndex) => {
    const key = `${colIndex}-${rowIndex}`;
    const newColor = selectedColor;

    setPixels((prevPixels) => ({
      ...prevPixels,
      [key]: newColor,
    }));

    if (canvasId !== null) {
      axios
        .post('http://127.0.0.1:8000/canvas/api/place', {
          canvas_id: canvasId,
          pixel_x: colIndex,
          pixel_y: rowIndex,
          pixel_color: newColor,
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
    <div className="pixelated-canvas-container">
      {/* Render the VerticalColorBar component */}
      <VerticalColorBar selectedColor={selectedColor} onColorSelect={setSelectedColor} />
      <ScreenshotButton className="my-classname" />


      {/* Canvas Stage */}
      <Stage width={width} height={height} className="my-classname stage-container">
        <Layer>
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
