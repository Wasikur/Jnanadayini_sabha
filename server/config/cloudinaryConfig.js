const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "jnandayini_images",
    format: async () => "webp", // Convert all images to WebP format
    transformation: [{ quality: "auto" }],
    resource_type: "image",
  },
});

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "jnandayini_videos",
    resource_type: "video",
    format: async (req, file) => "mp4", // Ensure only MP4 format
  },
});

module.exports = { cloudinary, imageStorage, videoStorage };
