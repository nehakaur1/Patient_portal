// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const filesRouter = require("./routes/files");

const app = express();
app.use(cors());
app.use(express.json());

// serve uploads statically if you want direct access (optional)
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
app.use("/uploads", express.static(path.join(__dirname, UPLOAD_DIR)));

// routes
app.use("/", filesRouter);

// connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/patient_portal";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
