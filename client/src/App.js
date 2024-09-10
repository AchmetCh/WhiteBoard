import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllDrawings from './components/AllDrawings';
import DrawingDetail from './components/DrawingDetail';
import DrawingBoard from './components/DrawingBoard';
import UpdateDrawing from './components/UpdateDrawing'

function App() {
  return (
<Router>
  <Routes>
    <Route path="/" element={<AllDrawings />} />
    <Route path="/drawing/:id" element={<DrawingDetail />} />
    <Route path="/draw" element={<DrawingBoard />} />
    <Route path="/updatedrawing/:id" element={<UpdateDrawing />} />
  </Routes>
</Router>
  );
}

export default App;
