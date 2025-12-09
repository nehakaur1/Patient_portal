// routes/files.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const File = require("../models/File");

// multer storage config
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

// ensure upload dir exists
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// store file using a safe storedFilename (timestamp + original)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // append timestamp to avoid collisions
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "_");
    const storedName = `${timestamp}_${safeName}`;
    cb(null, storedName);
  }
});

// filter only pdfs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed"), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 20 * 1024 * 1024 } }); // 20MB

// POST /upload - upload one file; form field name expected: 'pdf'
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded or invalid file type" });

    // save metadata to DB
    const fileDoc = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });

    await fileDoc.save();

    res.status(201).json({ message: "File uploaded", file: req.file.filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Upload failed" });
  }
});

// GET /files - return array of stored filenames (compatible with your frontend)
router.get("/files", async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    // return just filenames (older frontend expects array of strings)
    const filenames = files.map((f) => f.filename);
    res.json(filenames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to list files" });
  }
});

// GET /files/meta - return full metadata (optional)
router.get("/files/meta", async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to list file metadata" });
  }
});

// GET /download/:filename - download file
router.get("/download/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const fileDoc = await File.findOne({ filename });
    if (!fileDoc) return res.status(404).json({ message: "File not found" });

    const filePath = path.join(UPLOAD_DIR, filename);

    // check file exists
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File not found on server" });

    // use originalName for download filename
    res.download(filePath, fileDoc.originalName);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Download failed" });
  }
});

// DELETE /delete/:filename - delete file and metadata
router.delete("/delete/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const fileDoc = await File.findOne({ filename });
    if (!fileDoc) return res.status(404).json({ message: "File not found" });

    const filePath = path.join(UPLOAD_DIR, filename);

    // remove file from disk if exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // remove metadata
    await File.deleteOne({ filename });

    res.json({ message: "File deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
