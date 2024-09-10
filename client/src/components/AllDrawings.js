import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllDrawings = () => {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/getall')
      .then(response => setDrawings(response.data))
      .catch(error => console.error('Error fetching drawings:', error));
  }, []);

  const deleteDrawing = async(id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/deletedrawing/${id}`)
            setDrawings(drawings.filter(drawing => drawing._id !== id));
            }
            catch (error) {
                console.error('Error deleting drawing:', error);
                }        
  }

  return (
    <div>
      <h1>All Drawings</h1>
      {drawings.map(drawing => (
        <div key={drawing._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <h2>{drawing.title}</h2>
          <Link to={`/drawing/${drawing._id}`}>View</Link>
          <br />
          <Link to={`/updatedrawing/${drawing._id}`}>
            <button style={{ marginTop: '10px' }}>Update</button>
          </Link>
          <button style={{ marginTop: '10px' }} onClick={() => deleteDrawing(drawing._id)}>Delete</button>
        </div>
      ))}
      <Link to="/draw">Create New Drawing</Link>
    </div>
  );
};

export default AllDrawings;
