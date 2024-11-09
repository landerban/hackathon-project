import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/gallery.css';
import redflower from '../assets/redflower.jpeg';
import blueflower from '../assets/blueflower.jpeg';
import About_Us_bg from '../assets/About_Us_bg.png';

const images = [redflower, blueflower, About_Us_bg]; // Array of slideshow images

const GalleryPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="gallery-container">
      <div className="left-side">
        <img src={redflower} alt="Decorative 1" className="decorative-image" />
        <div className="canva-text">Canva made on 09.11.2024</div>
        <img src={blueflower} alt="Decorative 2" className="decorative-image" />
      </div>
      <div className="right-side">
        <div className="slideshow-container">
          <AnimatePresence>
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              className="slideshow-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
