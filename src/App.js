import React, { useEffect } from "react";
import './App.css';
import ImageProcessor from "./components/ImageProcessor";
import CubeFall from "./components/CubeFall";
import AOS from "aos";
import "aos/dist/aos.css"; 


const App = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Whether animation should happen only once
    });
  }, []);


  return (
    <div>
      <ImageProcessor />

      <CubeFall />
    </div>
  );
};

export default App;
