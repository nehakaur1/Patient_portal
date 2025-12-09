// models/File.js
const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },      // stored filename in uploads/
  originalName: { type: String, required: true },  // original uploaded name
  size: { type: Number, required: true },          // in bytes
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("File", FileSchema);
