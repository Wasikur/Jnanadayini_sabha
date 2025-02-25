// routes/leaderRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const leaderController = require("../controllers/leaderController");

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/leaders/";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/", leaderController.getLeaders); // Get all leaders
router.post("/", upload.single("image"), leaderController.addLeader); // Add a new leader
router.put("/:id", upload.single("image"), leaderController.editLeader); // Edit leader by ID
router.delete("/:id", leaderController.deleteLeader); // Delete leader by ID

module.exports = router;
