import React, { useState, useEffect } from 'react';
import '../css/Summary.css';

const Summary = ({ totalCubes, mosaicData }) => {
  // State for cost, time, and cube size variables with default values
  const [costPerCube, setCostPerCube] = useState(0.05);
  const [timePerCube, setTimePerCube] = useState(1);
  const [cubeSize, setCubeSize] = useState(5.75); // Default cube size in cm

  // Calculate estimated cost
  const estimatedCost = (totalCubes * costPerCube).toFixed(2);

  // Calculate estimated time
  const estimatedTime = (totalCubes * timePerCube).toFixed(1); // in minutes

  // Calculate the estimated size of the mosaic
  const rows = Math.ceil(mosaicData.length / 3); // Round up to the nearest integer
  const columns = Math.ceil(mosaicData[0]?.length / 3) || 0; // Round up to the nearest integer

  const mosaicWidth = (columns * cubeSize).toFixed(2); // total width in cm
  const mosaicHeight = (rows * cubeSize).toFixed(2); // total height in cm
  const estimatedSize = `${mosaicWidth} x ${mosaicHeight} cm`;

  return (
    <div className="summary-container">
      <h3>Mosaic Summary</h3>

      <div className="summary-item">
	  <label>
          Cost per Cube ($):
          <input
            type="number"
            value={costPerCube}
            onChange={(e) => setCostPerCube(parseFloat(e.target.value))}
            step="0.01"
            min="0"
          />
        </label>
        <strong>Cost: </strong> ${estimatedCost}
      </div>

      <div className="summary-item">
	  <label>
          Time per Cube (minutes):
          <input
            type="number"
            value={timePerCube}
            onChange={(e) => setTimePerCube(parseFloat(e.target.value))}
            step="0.1"
            min="0"
          />
        </label>
        <strong>Time: </strong> {estimatedTime} minutes
      </div>
      <div className="summary-item">
	  <label>
          Cube Size (cm):
          <input
            type="number"
            value={cubeSize}
            onChange={(e) => setCubeSize(parseFloat(e.target.value))}
            step="0.01"
            min="0"
          />
        </label>
        <strong>Size: </strong> {estimatedSize}
      </div>

      {/* Input fields for user to change cost, time, and cube size */}


    </div>
  );
};

export default Summary;
