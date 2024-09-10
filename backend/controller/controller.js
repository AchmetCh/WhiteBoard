const Drawing = require("../models/drawing");

exports.newDraw = async (req, res) => {
  try {
    const drawing = new Drawing(req.body);
    await drawing.save();
    res.status(201).json({ message: "Drawing created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating drawing" });
  }
};

exports.getAllDrawings = async (req, res) => {
  try {
    const drawings = await Drawing.find();
    res.status(200).json(drawings);
  } catch (error) {
    res.status(404).json({ message: "No drawings found" });
  }
};

exports.getDrawingbyId = async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) {
      return res.status(404).json({ message: "Drawing not found" });
    }
    res.status(200).json(drawing);
  } catch (error) {
    res.status(404).json({ message: "Drawing not found" });
  }
};

exports.updateDrawing = async (req, res) => {
  try {
    const drawing = await Drawing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!drawing) {
      return res.status(404).json({ message: "Drawing not found" });
    }
    res.status(200).json({ message: "Drawing updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating drawing" });
  }
};

exports.deleteDrawing = async(req,res) => {
    try {
        await Drawing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Drawing deleted successfully" });
        } catch (error) {
            res.status(404).json({ message: "Drawing not found" });
            }
}

