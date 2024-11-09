import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DarkModeAnimation = ({ isAnimating, isDark }) => {
  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="overlay"
          initial={{
            scale: 0,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            opacity: 1,
          }}
          animate={{
            scale: 50,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5 },
          }}
          style={{
            position: 'fixed',
            borderRadius: '50%',
            backgroundColor: isDark ? '#1a1a1a' : "#9f6161",
            width: 40,
            height: 40,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default DarkModeAnimation;
