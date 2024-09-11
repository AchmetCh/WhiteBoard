import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';
import axios from 'axios';

const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const [title, setTitle] = useState(''); // To store the title of the drawing
  const [shapes, setShapes] = useState([]); // State to store shapes
  const [textAnnotations, setTextAnnotations] = useState([]); // State to store text annotations

  const navigate = useNavigate()

  // Function to add a shape
  const addShape = (type) => {
    const newShape = {
      type,
      startX: 50, // Default starting position
      startY: 50,
      width: type === 'rectangle' ? 100 : undefined, // For rectangle
      height: type === 'rectangle' ? 50 : undefined, // For rectangle
      radius: type === 'circle' ? 30 : undefined, // For circle
      color: 'blue', // Default color
    };
    setShapes([...shapes, newShape]);
  };

  // Function to add a text annotation
  const addTextAnnotation = () => {
    const newText = {
      content: 'Sample Text', // Default text
      x: 100, // Default position
      y: 100,
      fontSize: 16,
      color: 'red', // Default color
    };
    setTextAnnotations([...textAnnotations, newText]);
  };

  // Function to save the drawing
  const saveDrawing = async () => {
    const drawingData = JSON.parse(canvasRef.current.getSaveData()); // Get the serialized drawing data
  
    // Transform canvas drawing data into the format expected by the backend
    const lines = drawingData.lines.map((line) => ({
      x1: line.points[0].x,
      y1: line.points[0].y,
      x2: line.points[1].x,
      y2: line.points[1].y,
      color: 'black',
      thickness: line.brushRadius,
    }));
  
    const drawing = {
      title,
      lines,          
      shapes,         
      textAnnotations, 
    };
  
    try {
      await axios.post('http://localhost:8000/api/newdraw', drawing);
      alert('Drawing saved successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving the drawing:', error);
      alert('Failed to save the drawing.');
    }
  };
  

  return (
    <div>
      <h1>Drawing Board</h1>
      
      {/* Input to set the title of the drawing */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter drawing title"
      />

      {/* CanvasDraw component */}
      <CanvasDraw ref={canvasRef}   enablePanAndZoom
          clampLinesToDocument
          gridColor="#ccc" />

      {/* Buttons to add shapes */}
      <div>
        <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
      </div>

      {/* Button to add text annotation */}
      <div>
        <button onClick={addTextAnnotation}>Add Text Annotation</button>
      </div>

      {/* Save button */}
      <button onClick={saveDrawing}>Save Drawing</button>

      {/* Display the shapes and text annotations (for visualization purpose) */}
      <div>
        <h2>Shapes:</h2>
        <ul>
          {shapes.map((shape, index) => (
            <li key={index}>
              {shape.type} - {shape.color} at ({shape.startX}, {shape.startY})
            </li>
          ))}
        </ul>

        <h2>Text Annotations:</h2>
        <ul>
          {textAnnotations.map((text, index) => (
            <li key={index}>
              "{text.content}" at ({text.x}, {text.y}) - {text.fontSize}px, {text.color}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DrawingBoard;
