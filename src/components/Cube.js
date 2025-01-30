

import React from "react";
import "../css/cube.css"; // Import the CSS file for styling



const Cube = ({ colors }) => {
  return (
    <div className="cube-container">
      <div className="cube-overlay">
        {colors.map((color, index) => (
          <div
            key={index}
            className="cube-square"
            style={{
              backgroundColor: color,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Cube;
