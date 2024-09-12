const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  x: Number,
  y: Number,
});
const lineSchema = new mongoose.Schema({
  points: [pointSchema],  // Array of points
  color: String,
  brushRadius: Number,  // Renamed to match the terminology used in react-canvas-draw
});

const drawingSchema = new mongoose.Schema({
  title: String,
  lines: [lineSchema],
  createdAt: { type: Date, default: Date.now },
});

const Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;
