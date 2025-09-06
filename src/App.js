import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Photos from './pages/Photos';
import UnderConstruction from './pages/UnderConstruction';
import ScrollToTop from './ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop /> {/* Automatically scrolls to top when changing pages */}
      <div className="app">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/under-construction" element={<UnderConstruction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;