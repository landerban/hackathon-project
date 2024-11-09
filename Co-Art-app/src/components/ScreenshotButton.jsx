import React from 'react';
import html2canvas from 'html2canvas';
import cameraIcon from '../assets/camera-icon.png'; // Assuming you have an icon in your assets folder
import '../css/ScreenshotButton.css';

const ScreenshotButton = ({ className }) => {
  const handleTakeScreenshot = () => {
    const element = document.querySelector(`.${className}`);
    
    if (element) {
      html2canvas(element, { useCORS: true }).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'screenshot.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert('Screenshot taken and downloaded!');
      });
    } else {
      console.error(`No element found with class name: ${className}`);
      alert(`Element with class "${className}" not found.`);
    }
  };

  return (
    <button className="screenshot-button" onClick={handleTakeScreenshot}>
      <img src={cameraIcon} alt="Take Screenshot" className="screenshot-icon" />
    </button>
  );
};

export default ScreenshotButton;
