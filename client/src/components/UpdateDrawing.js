import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';

const UpdateDrawing = () => {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);
  const [brushRadius, setBrushRadius] = useState(10);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getdrawing/${id}`)
      .then((response) => {
        const data = response.data;
        setDrawing(data);
      })
      .catch((error) => console.error('Error fetching drawing:', error));
  }, [id]);

  useEffect(() => {
    if (drawing && canvasRef.current) {
      const saveData = {
        lines: drawing.lines.map((line) => ({
          points: line.points,
          brushColor: line.color,
          brushRadius: line.brushRadius,
        })),
        width: window.innerWidth,
        height: window.innerWidth,
      };

      try {
        canvasRef.current.loadSaveData(JSON.stringify(saveData));
      } catch (error) {
        console.error("Error loading save data:", error);
      }
    }
  }, [drawing]);

  const updateDrawing = async () => {
    try {
      const updatedData = {   
        lines: canvasRef.current ? JSON.parse(canvasRef.current.getSaveData()).lines : [],
      };
      await axios.put(`http://localhost:8000/api/updatedrawing/${id}`, updatedData);
      alert('Drawing updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating drawing:', error);
      alert('Failed to update the drawing.');
    }
  };

  if (!drawing) return <p>Loading...</p>;

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <h1>Update Drawing</h1>

      {/* Render shape and text annotation inputs here */}

      <button onClick={updateDrawing} style={{width:'200px'}}>Update Drawing</button>
      <label>Brush-Radius:</label>
      <div>
          <input
            type="number"
            value={brushRadius}
            onChange={(e) => setBrushRadius(parseInt(e.target.value, 10))}
          />
        </div>
      <div >
      <CanvasDraw ref={canvasRef}   brushRadius={brushRadius}  canvasWidth={window.innerWidth} canvasHeight={window.innerWidth} />
      </div>
    </div>
  );
};

export default UpdateDrawing;
