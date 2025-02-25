const fs = require("fs");
const path = require("path");
const Album = require("../models/Album");
const Image = require("../models/Image");
require("dotenv").config();

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000"; // Default fallback

const createAlbum = async (req, res) => {
  const { name } = req.body;
  console.log(`[INFO] Received request to create album with name: "${name}"`);

  try {
    const album = new Album({ name });
    await album.save();
    console.log(`[SUCCESS] Album created with ID: ${album._id}`);
    res.status(201).json(album);
  } catch (error) {
    console.error(`[ERROR] Failed to create album: ${error.message}`);
    res.status(500).json({ message: "Error creating album" });
  }
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  console.log(`[INFO] Received request to delete album with ID: ${id}`);

  try {
    const album = await Album.findById(id).populate("images");
    if (!album) {
      console.warn(`[WARNING] Album with ID ${id} not found`);
      return res.status(404).json({ message: "Album not found" });
    }

    console.log(
      `[INFO] Deleting ${album.images.length} associated images for album ID: ${id}`
    );
    for (const image of album.images) {
      const imagePath = path.resolve(
        __dirname,
        "..",
        image.path.replace(`${SERVER_URL}/`, "")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`[SUCCESS] Deleted image file: ${imagePath}`);
      } else {
        console.warn(
          `[WARNING] Image file not found, skipping deletion: ${imagePath}`
        );
      }

      await Image.findByIdAndDelete(image._id);
      console.log(
        `[SUCCESS] Deleted image record from database with ID: ${image._id}`
      );
    }

    await Album.findByIdAndDelete(id);
    console.log(`[SUCCESS] Album deleted successfully with ID: ${id}`);
    res
      .status(200)
      .json({ message: "Album and associated images deleted successfully" });
  } catch (error) {
    console.error(`[ERROR] Error deleting album: ${error.message}`);
    res.status(500).json({ message: "Error deleting album" });
  }
};

const getAlbums = async (req, res) => {
  console.log("[INFO] Received request to retrieve all albums");

  try {
    const albums = await Album.find().populate("images");
    console.log(`[SUCCESS] Retrieved ${albums.length} albums`);
    res.status(200).json(albums);
  } catch (error) {
    console.error(`[ERROR] Failed to retrieve albums: ${error.message}`);
    res.status(500).json({ message: "Error retrieving albums" });
  }
};

const editAlbum = async (req, res) => {
  const { id } = req.params; // Get the MongoDB _id from the request params
  const { name } = req.body;
  console.log(`[INFO] Received request to edit album with ID: ${id}`);

  try {
    // Use the MongoDB _id to find the album
    const album = await Album.findById(id);
    if (!album) {
      console.warn(`[WARNING] Album with ID ${id} not found`);
      return res.status(404).json({ message: "Album not found" });
    }

    // Update the album properties
    album.name = name;
    album.updatedAt = new Date(); // You can remove this line if you have timestamps enabled
    await album.save(); // Save the updated album

    console.log(`[SUCCESS] Album updated successfully with ID: ${id}`);
    res.status(200).json(album); // Return the updated album
  } catch (error) {
    console.error(`[ERROR] Failed to update album: ${error.message}`);
    res.status(500).json({ message: "Error updating album" });
  }
};

const getAlbumById = async (req, res) => {
  const albumId = req.params.id;
  console.log(`[INFO] Received request to retrieve album with ID: ${albumId}`);

  try {
    const album = await Album.findById(albumId).populate("images");
    if (!album) {
      console.warn(`[WARNING] Album with ID ${albumId} not found`);
      return res.status(404).json({ error: "Album not found" });
    }

    console.log(`[SUCCESS] Retrieved album with ID: ${albumId}`);
    res.status(200).json(album); // Send album details, including images if necessary
  } catch (error) {
    console.error(`[ERROR] Failed to retrieve album: ${error.message}`);
    res.status(500).json({ message: "Error retrieving album" });
  }
};

module.exports = {
  createAlbum,
  deleteAlbum,
  getAlbums,
  getAlbumById,
  editAlbum,
};