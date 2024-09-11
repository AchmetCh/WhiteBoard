import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDrawing = () => {
  const { id } = useParams(); // Get the drawing ID from the URL
  const [drawing, setDrawing] = useState(null);
  const [title, setTitle] = useState('');
  const [shapes, setShapes] = useState([]);
  const [textAnnotations, setTextAnnotations] = useState([]);
  const navigate = useNavigate();

  // Fetch the current drawing to update
  useEffect(() => {
    axios.get(`http://localhost:8000/api/getdrawing/${id}`)
      .then((response) => {
        const data = response.data;
        setDrawing(data);
        setTitle(data.title); // Set the title
        setShapes(data.shapes); // Set the shapes
        setTextAnnotations(data.textAnnotations); // Set the text annotations
      })
      .catch((error) => console.error('Error fetching drawing:', error));
  }, [id]);

  // Handle input change for shapes and text annotations
  const handleShapeChange = (index, key, value) => {
    const updatedShapes = [...shapes];
    updatedShapes[index][key] = value;
    setShapes(updatedShapes);
  };

  const handleTextChange = (index, key, value) => {
    const updatedTexts = [...textAnnotations];
    updatedTexts[index][key] = value;
    setTextAnnotations(updatedTexts);
  };

  // Update the drawing on the server
  const updateDrawing = async () => {
    try {
      const updatedData = {
        title,
        shapes,
        textAnnotations
      };
      await axios.put(`http://localhost:8000/api/updatedrawing/${id}`, updatedData);
      alert('Drawing updated successfully!');
      navigate('/'); // Redirect to the all drawings page after updating
    } catch (error) {
      console.error('Error updating drawing:', error);
      alert('Failed to update the drawing.');
    }
  };

  if (!drawing) return <p>Loading...</p>;

  return (
    <div>
      <h1>Update Drawing</h1>

      {/* Input for title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter drawing title"
      />

      <h2>Shapes</h2>
      {shapes.map((shape, index) => (
        <div key={index}>
          <input
            type="text"
            value={shape.type}
            onChange={(e) => handleShapeChange(index, 'type', e.target.value)}
            placeholder="Shape type"
          />
          <input
            type="number"
            value={shape.startX}
            onChange={(e) => handleShapeChange(index, 'startX', e.target.value)}
            placeholder="Start X"
          />
          <input
            type="number"
            value={shape.startY}
            onChange={(e) => handleShapeChange(index, 'startY', e.target.value)}
            placeholder="Start Y"
          />
          <input
            type="number"
            value={shape.width}
            onChange={(e) => handleShapeChange(index, 'width', e.target.value)}
            placeholder="Width"
          />
          <input
            type="number"
            value={shape.height}
            onChange={(e) => handleShapeChange(index, 'height', e.target.value)}
            placeholder="Height"
          />
          <input
            type="text"
            value={shape.color}
            onChange={(e) => handleShapeChange(index, 'color', e.target.value)}
            placeholder="Color"
          />
        </div>
      ))}

      <h2>Text Annotations</h2>
      {textAnnotations.map((text, index) => (
        <div key={index}>
          <input
            type="text"
            value={text.content}
            onChange={(e) => handleTextChange(index, 'content', e.target.value)}
            placeholder="Text content"
          />
          <input
            type="number"
            value={text.x}
            onChange={(e) => handleTextChange(index, 'x', e.target.value)}
            placeholder="X"
          />
          <input
            type="number"
            value={text.y}
            onChange={(e) => handleTextChange(index, 'y', e.target.value)}
            placeholder="Y"
          />
          <input
            type="number"
            value={text.fontSize}
            onChange={(e) => handleTextChange(index, 'fontSize', e.target.value)}
            placeholder="Font size"
          />
          <input
            type="text"
            value={text.color}
            onChange={(e) => handleTextChange(index, 'color', e.target.value)}
            placeholder="Text color"
          />
        </div>
      ))}

      {/* Button to update the drawing */}
      <button onClick={updateDrawing}>Update Drawing</button>
    </div>
  );
};

export default UpdateDrawing;
