import React, { useRef, useState, useEffect } from "react";
import MosaicGenerator from "./MosaicGenerator";
import html2canvas from "html2canvas";
import "../css/MosaicGenerator.css";
import "../css/ImageProcessor.css";

// images
import mario from '../Assets/images/mario.png';
import bulkCubes from '../Assets/images/bulkCubes.jpg';
import assemble from '../Assets/images/assemble.png';
import showOff from '../Assets/images/showOff.png';
import BgCube from "./BgCube";

import Summary from "./Summary.js";


const CUBE_COLORS = {
  white: [255, 255, 255],
  red: [183, 18, 52],
  blue: [0, 70, 173],
  yellow: [255, 213, 0],
  green: [0, 155, 72],
  orange: [255, 88, 0],
};

const ImageProcessor = () => {
  const [mosaicData, setMosaicData] = useState([]);
  const [totalCubes, setTotalCubes] = useState(1000);
  const [selectedColors, setSelectedColors] = useState({
    white: true,
    yellow: true,
    green: true,
    orange: true,
    red: true,
    blue: true,
  });
  const [displayCubeColors, setDisplayCubeColors] = useState([]); 


  const [imageSrc, setImageSrc] = useState(null);
  const [mappingMethod, setMappingMethod] = useState("grayscale"); // New state
  const canvasRef = useRef(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCubeSelect = (colors) => {
    console.log("Selected Cube Colors:", colors);
	setDisplayCubeColors(colors);
  };

  const downloadAsPNG = () => {
    const mosaicContainer = document.querySelector(".mosaic-container");
    html2canvas(mosaicContainer).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "mosaic.png";
      link.click();
    });
  };

  useEffect(() => {
    if (imageSrc) {
      processImage(imageSrc);
    }
  }, [imageSrc, totalCubes, selectedColors, mappingMethod]);

  const processImage = (imageSrc) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const aspectRatio = imgWidth / imgHeight;
      const totalCubesAllowed = totalCubes * 9;
      let cols = Math.floor(Math.sqrt(totalCubesAllowed * aspectRatio));
      let rows = Math.floor(totalCubesAllowed / cols);

      while (cols * rows > totalCubesAllowed) {
        rows--;
      }

      const gridSize = 3;
      canvas.width = cols * gridSize;
      canvas.height = rows * gridSize;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mosaic = [];
      for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
          const imageData = ctx.getImageData(
            x * gridSize,
            y * gridSize,
            gridSize,
            gridSize
          );
          const cubeColor = mapToCubeColor(imageData.data);
          row.push(cubeColor);
        }
        mosaic.push(row);
      }

      setMosaicData(mosaic);
    };
  };

  const mapToCubeColor = (data) => {
    if (mappingMethod === "grayscale") {
      const grayscale = getGrayscaleValue(data);
      return mapGrayscaleToColor(grayscale);
    } else {
      return findClosestRGBMatch(data);
    }
  };

  const getGrayscaleValue = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i += 4) {
      total += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    return Math.round(total / (data.length / 4));
  };

  const mapGrayscaleToColor = (grayscale) => {
    const availableColors = Object.keys(selectedColors).filter(
      (color) => selectedColors[color]
    );
    const rangeSize = Math.floor(256 / availableColors.length);
    for (let i = 0; i < availableColors.length; i++) {
      if (grayscale >= i * rangeSize && grayscale < (i + 1) * rangeSize) {
        return availableColors[i];
      }
    }
    return "white";
  };

  const findClosestRGBMatch = (data) => {
    let minDistance = Infinity;
    let closestColor = "white";

    const r = data[0], g = data[1], b = data[2];
    
    Object.entries(CUBE_COLORS).forEach(([color, [cr, cg, cb]]) => {
      if (selectedColors[color]) {
        const distance = Math.sqrt(
          Math.pow(r - cr, 2) + Math.pow(g - cg, 2) + Math.pow(b - cb, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestColor = color;
        }
      }
    });
    return closestColor;
  };
  useEffect(() => {
    const textElement = document.querySelector('.random-fall-text');
    if (textElement) {
      const letters = textElement.textContent.split('');

      // Map each character into a span element, keeping spaces intact
      textElement.innerHTML = letters
        .map(letter => (letter === ' ' ? '<span class="space">&nbsp;</span>' : `<span>${letter}</span>`))
        .join('');

      // Randomize the fall order for non-space letters
      const spans = Array.from(document.querySelectorAll('.random-fall-text span:not(.space)'));
      const randomizedOrder = spans.map((span, i) => ({ span, order: Math.random() }))
        .sort((a, b) => a.order - b.order);

      randomizedOrder.forEach(({ span }, i) => {
        setTimeout(() => {
          span.classList.add('revealed');
          span.style.animationDelay = `${i * 0.1}s`;
        }, i * 100); // Gradually reveal letters one by one
      });
    }


  }, []);


  return (
    <div >
      <h1 className="random-fall-text">Rubik's Cube Art</h1>

		<div>
			<div className="slogan">
			<p data-aos="fade-right" data-aos-delay="2000">Let's Get Creative!</p>
			</div>
			<div className="desc-1">
				<div data-aos="fade-right" data-aos-offset="500">
					<h2>Choose a Unique Design</h2>
					<img src = {mario} alt='Rubiks Cube Mosaic Mario'/>
				</div>
			</div>
			<div className="desc-2">
				<div data-aos="fade-left" data-aos-offset="900" >
					<h2>Collect Hundreds of Cubes</h2>
					<img src = {bulkCubes} alt='Rubiks Cubes'/>
				</div>
			</div>
			<div className="desc-3">
				<div data-aos="fade-right" data-aos-offset="1400">
					<h2>Assemble Your Mosaic</h2>
					<img src = {assemble} alt='Rubiks Cubes'/>
				</div>
			</div>
			<div className="desc-4">
				<div data-aos="fade-left" data-aos-offset="1900" >
					<h2>Show it Off</h2>
					<img src = {showOff} alt='Rubiks Cubes'/>
				</div>
			</div>

		</div>




	<div id='mosaic-display'>

	  <div id='mosaic-controls'>

		<div>
		<input type="file" accept="image/*" onChange={handlePhotoUpload} />
		</div>

		<div>
			<label>Total Cubes: </label>
			<input
			type="number"
			value={totalCubes}
			onChange={(e) => {
				let value = parseInt(e.target.value, 10) || 1; // Ensure it's at least 1
				if (value > 3000) value = 3000; // Enforce max limit
				setTotalCubes(value);
			  }}			
			min="1"
			max="3000"
			/>
		</div>

		<div>
			<label>Mapping Method:</label>
			<label>
			<input
				type="radio"
				value="grayscale"
				checked={mappingMethod === "grayscale"}
				onChange={() => setMappingMethod("grayscale")}
			/>
			Grayscale
			</label>
			<label>
			<input
				type="radio"
				value="rgb"
				checked={mappingMethod === "rgb"}
				onChange={() => setMappingMethod("rgb")}
			/>
			RGB Matching
			</label>
		</div>
		<BgCube colors={displayCubeColors} size={150}/>

		<canvas ref={canvasRef}></canvas>
		{mosaicData.length > 0 && (
			<div>
				<button id='png-download' onClick={downloadAsPNG}>Download as PNG</button>
			</div>
		)}
	  </div>
	  
		<div id='mosaic'>
			{mosaicData.length > 0 && (
			<div>
				<MosaicGenerator mosaicData={mosaicData} onCubeSelect={handleCubeSelect} />
			</div>
			)}
		</div>

	</div>

	<div>
		{mosaicData.length > 0 && (
		<Summary totalCubes={totalCubes} mosaicData={mosaicData}/>
		)}
	</div>

	<div id='support'>
		<p>If you enjoyed this free tool and would like to support the me, consider donating so I can continue to make cool free tools like this one!</p>
		<a href="https://buymeacoffee.com/sethlangendoen" target="_blank" rel="noopener noreferrer">
		<button id="support-button">Donate</button>
		</a>
	</div>





    </div>
  );
};

export default ImageProcessor;
