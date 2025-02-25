const CoverImage = require("../models/CoverImage");
const fs = require("fs");
const path = require("path");

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

// Upload a cover image for a post
const uploadCoverImage = async (req, res) => {
  const file = req.file; // Assuming single file upload using multer

  console.log("[INFO] Received request to upload a cover image.");

  if (!file) {
    console.warn("[WARNING] No file was uploaded in the request.");
    return res.status(400).json({ message: "No file was uploaded" });
  }

  try {
    console.log(
      `[INFO] Saving cover image to database. Filename: ${file.originalname}`
    );

    const newCoverImage = new CoverImage({
      filename: file.originalname,
      path: `${SERVER_URL}/uploads/${file.filename}`,
    });

    const savedCoverImage = await newCoverImage.save();
    console.log(
      `[SUCCESS] Cover image uploaded and saved with ID: ${savedCoverImage._id}`
    );
    res.status(201).json(savedCoverImage);
  } catch (error) {
    console.error(`[ERROR] Error uploading cover image: ${error.message}`);
    res.status(500).json({ message: "Error uploading cover image" });
  }
};

// Delete a cover image by ID
const deleteCoverImage = async (req, res) => {
  const { id } = req.params;
  console.log(`[INFO] Received request to delete cover image with ID: ${id}`);

  try {
    const coverImage = await CoverImage.findById(id);
    if (!coverImage) {
      console.warn(`[WARNING] Cover image with ID ${id} not found.`);
      return res.status(404).json({ message: "Cover image not found" });
    }

    const imagePath = path.resolve(
      __dirname,
      "..",
      coverImage.path.replace(`${SERVER_URL}/`, "")
    );

    console.log(`[INFO] Deleting image file from filesystem: ${imagePath}`);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`[SUCCESS] Image file deleted: ${imagePath}`);
    } else {
      console.warn(
        `[WARNING] Image file not found on filesystem, skipping deletion: ${imagePath}`
      );
    }

    await CoverImage.findByIdAndDelete(id);
    console.log(
      `[SUCCESS] Cover image record deleted from database with ID: ${id}`
    );
    res.status(200).json({ message: "Cover image deleted successfully" });
  } catch (error) {
    console.error(`[ERROR] Error deleting cover image: ${error.message}`);
    res.status(500).json({ message: "Error deleting cover image" });
  }
};

module.exports = {
  uploadCoverImage,
  deleteCoverImage,
};
