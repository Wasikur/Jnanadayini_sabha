const Carousel = require("../models/Carousel"); // Import the correct model
const fs = require("fs");
const path = require("path");

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

// Upload an image for the carousel
const uploadCarouselImage = async (req, res) => {
  const file = req.file; // Assuming single file upload using multer

  console.log("[INFO] Received request to upload a carousel image.");

  if (!file) {
    console.warn("[WARNING] No file was uploaded in the request.");
    return res.status(400).json({ message: "No file was uploaded" });
  }

  try {
    console.log(
      `[INFO] Saving carousel image to database. Filename: ${file.originalname}`
    );

    // Assuming the page URL comes from the request body
    const pageUrl = req.body.pageUrl || null;

    const newCarouselImage = new Carousel({
      filename: file.originalname,
      path: `${SERVER_URL}/uploads/carousel/${file.filename}`,
      pageUrl, // Add the page URL if provided
    });

    const savedCarouselImage = await newCarouselImage.save();
    console.log(
      `[SUCCESS] Carousel image uploaded and saved with ID: ${savedCarouselImage._id}`
    );
    res.status(201).json(savedCarouselImage);
  } catch (error) {
    console.error(`[ERROR] Error uploading carousel image: ${error.message}`);
    res.status(500).json({ message: "Error uploading carousel image" });
  }
};

// Delete a carousel image by ID
const deleteCarouselImage = async (req, res) => {
  const { id } = req.params;
  console.log(
    `[INFO] Received request to delete carousel image with ID: ${id}`
  );

  try {
    const carouselImage = await Carousel.findById(id); // Use Carousel model
    if (!carouselImage) {
      console.warn(`[WARNING] Carousel image with ID ${id} not found.`);
      return res.status(404).json({ message: "Carousel image not found" });
    }

    const imagePath = path.resolve(
      __dirname,
      "..",
      carouselImage.path.replace(`${SERVER_URL}/`, "")
    );

    console.log(`[INFO] Deleting image file from filesystem: ${imagePath}`);
    if (fs.existsSync(imagePath)) {
      await fs.promises.unlink(imagePath);
      console.log(`[SUCCESS] Image file deleted: ${imagePath}`);
    } else {
      console.warn(
        `[WARNING] Image file not found on filesystem, skipping deletion: ${imagePath}`
      );
    }

    await Carousel.findByIdAndDelete(id); // Use Carousel model
    console.log(
      `[SUCCESS] Carousel image record deleted from database with ID: ${id}`
    );
    res.status(200).json({ message: "Carousel image deleted successfully" });
  } catch (error) {
    console.error(`[ERROR] Error deleting carousel image: ${error.message}`);
    res.status(500).json({ message: "Error deleting carousel image" });
  }
};

const getCarouselImages = async (req, res) => {
  try {
    const images = await Carousel.find(); // Retrieve all images
    res.status(200).json(images);
  } catch (error) {
    console.error(`[ERROR] Error fetching carousel images: ${error.message}`);
    res.status(500).json({ message: "Error fetching carousel images" });
  }
};

module.exports = {
  uploadCarouselImage,
  deleteCarouselImage,
  getCarouselImages,
};
