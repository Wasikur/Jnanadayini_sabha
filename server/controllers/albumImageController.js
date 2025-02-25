const Image = require("../models/Image");
const Album = require("../models/Album");
const fs = require("fs");
const path = require("path");

const SERVER_URL = process.env.SERVER_URL || "http://82.29.164.27";

// Upload multiple images and associate them with an album
const uploadImage = async (req, res) => {
  const files = req.files.images; // Assuming multer for handling multiple files
  const albumId = req.body.albumId;
  console.log("Received request to upload images for album:", albumId);

  try {
    const savedImages = [];

    if (!files || files.length === 0) {
      console.warn("No files uploaded in the request");
      return res.status(400).json({ message: "No files were uploaded" });
    }

    for (let i = 0; i < files.length; i++) {
      console.log(
        `Processing file ${i + 1} of ${files.length}:`,
        files[i].originalname
      );

      const newImage = new Image({
        filename: files[i].originalname,
        path: `${SERVER_URL}/uploads/albums/${files[i].filename}`,
        album: albumId,
      });

      const savedImage = await newImage.save();
      console.log("Image saved to database:", savedImage);
      savedImages.push(savedImage);
    }

    if (albumId) {
      const updatedAlbum = await Album.findByIdAndUpdate(
        albumId,
        { $push: { images: { $each: savedImages.map((img) => img._id) } } },
        { new: true }
      );

      if (!updatedAlbum) {
        console.warn("Album not found with ID:", albumId);
        return res.status(404).json({ message: "Album not found" });
      }
      console.log("Updated album with new images:", updatedAlbum);
    }

    console.log("All images uploaded successfully");
    res.status(201).json(savedImages);
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Error uploading images", error });
  }
};

// Retrieve all images from the database
const getImages = async (req, res) => {
  console.log("Received request to retrieve all images");

  try {
    const images = await Image.find();
    console.log("Images retrieved successfully:", images);
    res.status(200).json(images);
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({ message: "Error retrieving images", error });
  }
};

// Delete an image by ID, remove it from album, and delete the file from the server
const deleteImage = async (req, res) => {
  const { id } = req.params;
  console.log("Received request to delete image with ID:", id);

  try {
    const image = await Image.findById(id);
    if (!image) {
      console.warn("Image not found with ID:", id);
      return res.status(404).json({ message: "Image not found" });
    }

    const imagePath = path.resolve(
      __dirname,
      "..",
      image.path.replace(`${SERVER_URL}/`, "")
    );
    if (fs.existsSync(imagePath)) {
      console.log("Deleting image file from server:", imagePath);
      fs.unlinkSync(imagePath);
    } else {
      console.warn("Image file does not exist on server:", imagePath);
    }

    await Album.findByIdAndUpdate(image.album, { $pull: { images: id } });
    console.log("Removed image from album's images array");

    await Image.findByIdAndDelete(id);
    console.log("Image deleted from database");

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Error deleting image", error });
  }
};

module.exports = {
  uploadImage,
  getImages,
  deleteImage,
};
