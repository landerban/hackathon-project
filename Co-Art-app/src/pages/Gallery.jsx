import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import '../css/gallery.css';
import redflower from '../assets/redflower.jpeg';
import blueflower from '../assets/blueflower.jpeg';
import About_Us_bg from '../assets/About_Us_bg.png';

const GalleryPage = () => {
  const [images, setImages] = useState([redflower, blueflower, About_Us_bg]); // Initial images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch images from the API
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/gallery/api/get-gallery/');
        const allImages = response.data.images; // Access the images array from response
        
        // Get only the last three images and prepend the base URL to each
        const baseUrl = 'http://127.0.0.1:8000';
        const lastThreeImages = allImages.slice(-3).map((img) => 
          img.image.startsWith('/media') ? `${baseUrl}${img.image}` : img.image
        );

        setImages(lastThreeImages); // Update images with the last three images
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchGalleryImages(); // Call the function to fetch images on component mount
  }, []);

  useEffect(() => {
    // Slideshow interval
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]); // Dependency on images.length to avoid issues if array is initially empty

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
