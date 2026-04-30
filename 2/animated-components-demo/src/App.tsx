import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ButtonDemo from './pages/ButtonDemo';
import PageTransitionDemo from './pages/PageTransitionDemo';
import HeartDemo from './pages/HeartDemo';
import ScrollAnimationDemo from './pages/ScrollAnimationDemo';
import TvShowDetail from './pages/TvShowDetail';
import SvgDemo from './pages/SvgDemo';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/button" element={<ButtonDemo />} />
        <Route path="/page-transition" element={<PageTransitionDemo />} />
        <Route path="/heart" element={<HeartDemo />} />
        <Route path="/scroll-animation" element={<ScrollAnimationDemo />} />
        <Route path="/scroll-animation/:id" element={<TvShowDetail />} />
        <Route path="/svg" element={<SvgDemo />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
