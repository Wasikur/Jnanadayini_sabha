const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  uploadCarouselImage,
  deleteCarouselImage,
  getCarouselImages,
} = require("../controllers/carouselController");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/carousel/";
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
router.post(
  "/uploadCarouselImage",
  upload.single("carouselImage"),
  uploadCarouselImage
);

router.delete("/deleteCarouselImage/:id", deleteCarouselImage);
router.get("/carouselImages", getCarouselImages);

module.exports = router;
