import React, { useState, useRef,createRef, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import CanvasDraw from "react-canvas-draw";
import axios from "axios";
import '../App.css'
import api from './Api'

const DrawingBoard = () => {
  const [color, setColor] = useState("#ffc600");
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [brushRadius, setBrushRadius] = useState(10);
  const [lazyRadius, setLazyRadius] = useState(12);
  const [title, setTitle] = useState(""); // For storing the title
  const [drawingId, setDrawingId] = useState(null); // To track the current drawing ID (for loading purposes)

  const saveableCanvas = createRef(null);
  const loadableCanvas = createRef(null);
  const navigate = useNavigate();

  // Save Drawing to Database
  const saveDrawing = async (e) => {
    e.preventDefault();
    if (title.length < 1) {
      alert("Please enter a title for your drawing.");
      return
    }

      const drawingData = JSON.parse(saveableCanvas.current.getSaveData()) // Get the serialized drawing data
      
      // No need to transform points, we will store them directly
      const lines = drawingData.lines.map((line) => ({
        points: line.points, // Array of points directly from canvas
        color: line.brushColor,
        brushRadius: line.brushRadius,
      }));
      
      const drawing = {
        title, // You can replace this with actual title
        lines
      };
      
      try {
        await axios.post(`${api}/newdraw`, drawing);
        alert("Drawing saved successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error saving the drawing:", error);
        alert("Failed to save the drawing.");
      }
    
  };

  return (
    <div>
      <h1>React Canvas Draw with Database</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter drawing title"
      />

      <div>
        <button onClick={saveDrawing}>Save</button>
        <button
          onClick={() => {
            saveableCanvas.current.eraseAll();
          }}
        >
          Erase
        </button>
        <button
          onClick={() => {
            saveableCanvas.current.undo();
          }}
        >
          Undo
        </button>
        <button onClick={e => navigate('/')} style={{width:'100px', marginTop: '10px'}}>Back</button>

        <div>
          <label>Brush-Radius:</label>
          <input
            type="number"
            value={brushRadius}
            onChange={(e) => setBrushRadius(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Lazy-Radius:</label>
          <input
            type="number"
            value={lazyRadius}
            onChange={(e) => setLazyRadius(parseInt(e.target.value, 10))}
          />
        </div>
      </div>

      {/* CanvasDraw component */}
      <CanvasDraw
       ref={saveableCanvas}
        brushColor='black'
        brushRadius={brushRadius}
        lazyRadius={lazyRadius}
        canvasWidth={width}
        canvasHeight={height}
      />

  

      {/* Disabled canvas to load saved data */}
     
    </div>
  );
};

export default DrawingBoard;