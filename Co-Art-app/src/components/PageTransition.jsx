import React from 'react';
import { motion } from 'framer-motion';

// Define animation variants
const pageTransition = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const pageTransitionConfig = {
  duration: 0.3,
};

// PageTransition Component for Page Transitions
const PageTransition = ({ children }) => (
  <motion.div
    variants={pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransitionConfig}
  >
    {children}
  </motion.div>
);

export default PageTransition;
