import React, { useState, useEffect } from "react";
import Cube from "./Cube";
import "../css/MosaicGenerator.css";

const MosaicGenerator = ({ mosaicData, onCubeSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected cube
  const [cubesData, setCubesData] = useState([]); // Store cube color data

  // Extract cube data with row structure on mount
  useEffect(() => {
    const extractedCubes = [];
    let flatCubes = []; // Flat array for indexing

    for (let row = 0; row < mosaicData.length; row += 3) {
      const rowCubes = [];
      for (let col = 0; col < mosaicData[row].length; col += 3) {
        const cubeColors = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const color = mosaicData[row + i]?.[col + j] || "white";
            cubeColors.push(color);
          }
        }
        rowCubes.push({ cubeColors, index: flatCubes.length });
        flatCubes.push(cubeColors);
      }
      extractedCubes.push(rowCubes);
    }
    setCubesData(extractedCubes);
  }, [mosaicData]);

  // Handle arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (cubesData.length === 0) return;

      let newIndex = selectedIndex;

      if (event.key === "ArrowRight") {
        newIndex = selectedIndex !== null ? selectedIndex + 1 : 0;
      } else if (event.key === "ArrowLeft" && selectedIndex !== null) {
        newIndex = selectedIndex > 0 ? selectedIndex - 1 : selectedIndex;
      }

      // Ensure index stays within bounds
      const totalCubes = cubesData.reduce((acc, row) => acc + row.length, 0);
      if (newIndex >= 0 && newIndex < totalCubes) {
        setSelectedIndex(newIndex);
        const selectedCube = cubesData.flat().find((cube) => cube.index === newIndex);
        if (selectedCube) {
          onCubeSelect(selectedCube.cubeColors);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, cubesData, onCubeSelect]);

  return (
    <div className="mosaic-container">
      {cubesData.map((rowCubes, rowIndex) => (
        <div key={rowIndex} className="mosaic-row">
          {rowCubes.map(({ cubeColors, index }) => (
            <div
              key={index}
              className={`cube-wrapper ${selectedIndex === index ? "selected" : ""}`}
              onClick={() => {
                setSelectedIndex(index);
                onCubeSelect(cubeColors);
              }}
            >
              <Cube colors={cubeColors} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MosaicGenerator;
