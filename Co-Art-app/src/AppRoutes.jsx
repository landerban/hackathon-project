import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Chats from './pages/Chats';
import About from './pages/About';
import Login from './pages/Login';
//import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import PageTransition from './components/PageTransition';
import Canvas from './pages/Canvas';

const AppRoutes = ({ isDark, isAuthenticated }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Home isDark={isDark} />
            </PageTransition>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          } 
        />
        {/* Protected route for /chats */}
        <Route
          path="/chats"
          element={
            isAuthenticated 
              ? (
                  <PageTransition>
                    <Chats isDark={isDark} />
                  </PageTransition>
                ) 
              : <Navigate to="/register" />
          }
        />
        
        <Route 
          path="/about" 
          element={
            <PageTransition>
              <About isDark={isDark} />
            </PageTransition>
          } 
        />

        <Route 
          path="/canvas" 
          element={
            <PageTransition>
              <Canvas isDark={isDark} />
            </PageTransition>
          } 
        />
        
        <Route 
          path="/register" 
          element={
            <PageTransition>
              <Register isDark={isDark} />
            </PageTransition>
          } 
        />
        
        <Route 
          path="*" 
          element={
            <PageTransition>
              <NotFound isDark={isDark} />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
