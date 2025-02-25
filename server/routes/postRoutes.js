const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
} = require("../controllers/postController");

const router = express.Router();

// Directory for storing uploaded cover images
const coverUploadDir = "uploads/cover_images/";

// Ensure the cover images directory exists
if (!fs.existsSync(coverUploadDir)) {
  fs.mkdirSync(coverUploadDir, { recursive: true });
}

// Configure multer storage
const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, coverUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomBytes(4).toString("hex");
    const ext = path.extname(file.originalname);
    const originalName = path.basename(file.originalname, ext);
    const newFilename = `${originalName}-${uniqueSuffix}${ext}`;
    cb(null, newFilename);
  },
});

const uploadCover = multer({ storage: coverStorage });

// Routes for posts
router.post("/", uploadCover.single("coverImage"), createPost);
router.put("/:id", uploadCover.single("coverImage"), updatePost);
router.delete("/:id", deletePost);
router.get("/", getPosts);
router.get("/:id", getPostById);

module.exports = router;
