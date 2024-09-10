import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DrawingDetail = () => {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getdrawing/${id}`)
      .then(response => setDrawing(response.data))
      .catch(error => console.error('Error fetching drawing:', error));
  }, [id]);

  useEffect(() => {
    console.log(drawing)
  })

  if (!drawing) return <p>Loading...</p>;

  return (
    <div>
      <h1>{drawing.title}</h1>

      {/* SVG container for rendering the drawing */}
      <svg width="800" height="600" style={{ border: '1px solid black' }}>
        
        {/* Render lines */}
        {drawing.lines && drawing.lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth={line.thickness}
          />
        ))}

        {/* Render shapes */}
        {drawing.shapes && drawing.shapes.map((shape, index) => {
          if (shape.type === 'rectangle') {
            return (
              <rect
                key={index}
                x={shape.startX}
                y={shape.startY}
                width={shape.width}
                height={shape.height}
                fill={shape.color}
              />
            );
          }
          if (shape.type === 'circle') {
            return (
              <circle
                key={index}
                cx={shape.startX}
                cy={shape.startY}
                r={shape.radius}
                fill={shape.color}
              />
            );
          }
          return null;
        })}

        {/* Render text annotations */}
        {drawing.textAnnotations && drawing.textAnnotations.map((text, index) => (
          <text
            key={index}
            x={text.x}
            y={text.y}
            fontSize={text.fontSize}
            fill={text.color}
          >
            {text.content}
          </text>
        ))}

      </svg>
    </div>
  );
};

export default DrawingDetail;
