import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';

const DrawingDetail = () => {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getdrawing/${id}`)
      .then(response => {
        console.log('Drawing Data:', response.data);
        setDrawing(response.data);
      })
      .catch(error => console.error('Error fetching drawing:', error));
  }, [id]);

  useEffect(() => {
    if (drawing && drawing.drawingData) {
      canvasRef.current.loadSaveData(drawing.drawingData);  // Load saved drawing data
    }
  }, [drawing]);

  if (!drawing) {
    return <p>No drawing available</p>;
  }

  return (
    <div>
      <h1>{drawing.title}</h1>
      <div style={{ width: '100%', height: '80vh' }}>
        <CanvasDraw ref={canvasRef} canvasWidth={800} canvasHeight={600} />
      </div>
    </div>
  );
};

export default DrawingDetail;
