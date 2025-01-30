import React, { useEffect, useState } from "react";
import BgCube from "./BgCube";
import "../css/CubeFall.css"; // Import the CSS file for the falling effect

const CubeFall = () => {
  const colorsArray = ["white", "orange", "yellow", "red", "green", "blue"];
  const [cubes, setCubes] = useState([]);

  const generateRandomCube = () => {
	const randomColors = [];
	for (let i = 0; i < 9; i++) {
	  const randomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];
	  randomColors.push(randomColor);
	}
  
	const randomPositionX = Math.floor(Math.random() * window.innerWidth);
	const randomSpeed = Math.floor(Math.random() * 8) + 10; // Speed between 5 and 10
	const randomPositionY = -100; // Start above the screen
	const randomRotation = Math.floor(Math.random() * 360); // Random rotation between 0 and 360 degrees
  
	return {
	  colors: randomColors,
	  positionX: randomPositionX,
	  positionY: randomPositionY,
	  speed: randomSpeed,
	  rotation: randomRotation, // Add rotation property
	};
  };
  

  useEffect(() => {

	const interval = setInterval(() => {
	  if (cubes.length < 20) { // Only create a new cube if there are fewer than 10
		const newCube = generateRandomCube();
		setCubes((prevCubes) => [...prevCubes, newCube]);
	  }
  
	  // Remove cubes that have fallen off the screen

	//   setCubes((prevCubes) =>
	// 	prevCubes.filter((cube) => cube.positionY < 1200)
	//   );
	}, 500); // Create a new cube every second
  
	return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [cubes]); // Make sure useEffect listens to changes in the `cubes` array
  

  // Watch for changes in cubes array and log it


  return (
    <div className="cube-fall-container">
      {cubes.map((cube, index) => (
        <div
          key={index}
          className="falling-cube"
          style={{
            left: `${cube.positionX}px`,
            top: `${cube.positionY}px`, // Add positionY here to ensure it's rendered
            animation: `fall ${cube.speed}s linear infinite`,
			transform: `rotate(${cube.rotation}deg)`, // Apply the random rotation here

          }}
        >
          <BgCube colors={cube.colors} size={cube.speed * 9} />
        </div>
      ))}

    </div>
  );
};

export default CubeFall;
