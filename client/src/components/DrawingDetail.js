import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';

const DrawingDetail = () => {
  const { id } = useParams(); // Getting the drawing ID from URL
  const [drawing, setDrawing] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getdrawing/${id}`)
      .then(response => {
        setDrawing(response.data); // Set drawing data from the response
      })
      .catch(error => console.error('Error fetching drawing:', error));
  }, [id]);

  useEffect(() => {
    if (drawing && drawing.lines) {
      canvasRef.current.loadSaveData(
        JSON.stringify({
          lines: drawing.lines.map((line) => ({
            points: line.points,
            brushColor: line.color,
            brushRadius: line.brushRadius,
          })),
          width: window.innerWidth,
          height: window.innerWidth,
        })
      );
    }
  }, [drawing]);

  if (!drawing) {
    return <p>No drawing available</p>;
  }

  return (
    <div>
      <h1>{drawing.title}</h1>
      <div>
        <CanvasDraw ref={canvasRef}  canvasWidth={window.innerWidth} canvasHeight={window.innerWidth} />
      </div>
    </div>
  );
};

export default DrawingDetail;

