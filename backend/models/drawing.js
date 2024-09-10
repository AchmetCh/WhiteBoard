const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  x1: Number,
  y1: Number,
  x2: Number,
  y2: Number,
  color: String,
  thickness: Number,
});

const shapeSchema = new mongoose.Schema({
  type: { type: String, enum: ['rectangle', 'circle', 'triangle'] },
  startX: Number,
  startY: Number,
  width: Number,
  height: Number,
  radius: Number,
  color: String,
});

const textAnnotationSchema = new mongoose.Schema({
  content: String,
  x: Number,
  y: Number,
  fontSize: Number,
  color: String,
});

const drawingSchema = new mongoose.Schema({
  title: String,
  lines: [lineSchema],
  shapes: [shapeSchema],
  textAnnotations: [textAnnotationSchema],
  createdAt: { type: Date, default: Date.now },
});

const Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;
