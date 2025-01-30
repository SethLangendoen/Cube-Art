import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import './App.css';
import ImageProcessor from "./components/ImageProcessor";
import CubeFall from "./components/CubeFall";
import AOS from "aos";
import "aos/dist/aos.css"; 
import Navbar from "./components/Navbar";


const App = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Whether animation should happen only once
    });
  }, []);


  return (
    <div>
      <Navbar /> 
      <CubeFall />

      <Routes>
      <Route path="/" element={
          <>
            <ImageProcessor />

          </>
        } />
      </Routes>

    </div>
  );
};

export default App;
