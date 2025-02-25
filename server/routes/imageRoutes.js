const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const {
  uploadImage,
  getImages,
  deleteImage,
} = require("../controllers/albumImageController");

const router = express.Router();

// Directory for storing uploaded images
const uploadDir = "uploads/albums/";
// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the uploads directory
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomBytes(4).toString("hex"); // Generate a random suffix
    const ext = path.extname(file.originalname); // Get file extension
    const originalName = path.basename(file.originalname, ext); // Get original name without extension
    const newFilename = `${originalName}-${uniqueSuffix}${ext}`; // Combine original name, suffix, and extension
    cb(null, newFilename); // Use the new filename
  },
});

// Create multer instance with the storage configuration
const upload = multer({ storage });

// Update the upload route to use multer with customized storage
router.post(
  "/upload",
  upload.fields([{ name: "images", maxCount: 10 }]), // Accept multiple files under the 'images' key
  uploadImage
);

router.post("/uploadCover", upload.single("coverImage"), async (req, res) => {
  try {
    // Ensure the file has been uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No cover image uploaded" });
    }

    res.status(200).json({
      filename: req.file.filename,
      path: req.file.path,
    });
  } catch (error) {
    console.error("Error uploading cover image:", error);
    res.status(500).json({ message: "Error uploading cover image", error });
  }
});

router.get("/images", getImages);
router.delete("/images/:id", deleteImage);

module.exports = router;
