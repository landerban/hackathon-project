import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Stage, Layer, Rect } from 'react-konva';
import VerticalColorBar from './VerticalColorBar';
import ScreenshotButton from './ScreenshotButton';
import '../css/PixelatedCanvas.css';
import defaultBackground from '../assets/react.svg';

const PixelatedCanvas = ({ width, height, gridCount }) => {
  const pixelSize = width / gridCount;
  const [pixels, setPixels] = useState({});
  const [canvasId, setCanvasId] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [backgroundImage, setBackgroundImage] = useState(defaultBackground);

  const changeBackgroundImage = (newImage) => {
    setBackgroundImage(newImage);
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/canvas/api/get_placements')
      .then((response) => {
        const placements = response.data;
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
  }, []);

  const handlePixelClick = useCallback((colIndex, rowIndex) => {
    const key = `${colIndex}-${rowIndex}`;
    const newColor = selectedColor;

    setPixels((prevPixels) => ({
      ...prevPixels,
      [key]: newColor,
    }));

    if (1) {
      axios
        .post('http://127.0.0.1:8000/canvas/api/place', {
          canvas_id: 1,
          pixel_x: colIndex,
          pixel_y: rowIndex,
          pixel_color: newColor,
          placed_by: 1,
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
  }, [canvasId, selectedColor]);

  return (
    <div className="pixelated-canvas-container">
      <div className="color-bar-container">
        <VerticalColorBar selectedColor={selectedColor} onColorSelect={setSelectedColor} />
        <ScreenshotButton className="canvas" />
      </div>

      <div
        className="canvas canvas-stage-container"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8)), url(${backgroundImage})`,
        }}
      >
        <Stage width={width} height={height}>
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

      {/* JSON Display for Debugging */}
      <div className="json-debug">
        <h3>Pixels State:</h3>
        <pre>{JSON.stringify(pixels, null, 2)}</pre>

        <h3>Canvas ID:</h3>
        <pre>{JSON.stringify(canvasId, null, 2)}</pre>
      </div>
    </div>
  );
};

export default PixelatedCanvas;
