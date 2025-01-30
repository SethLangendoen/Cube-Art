

import React from "react";
import "../css/BgCube.css"; // Import the CSS file for styling



const BgCube = ({ colors, size }) => {
  return (
    <div className="bg-cube-container" style={{width: `${size}px`, height: `${size}px`}}>
      <div className="bg-cube-overlay">
        {colors.map((color, index) => (
          <div
            key={index}
            className="bg-cube-square"
            style={{
              backgroundColor: color,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BgCube;
