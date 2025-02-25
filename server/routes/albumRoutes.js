const express = require("express");
const {
  createAlbum,
  editAlbum,
  deleteAlbum,
  getAlbums,
  getAlbumById,
} = require("../controllers/albumController");

const router = express.Router();

router.post("/create", createAlbum); // Ensure this matches the fetch request
router.put("/:id", editAlbum);
router.delete("/:id", deleteAlbum);
router.get("/", getAlbums);
router.get("/:id", getAlbumById);

module.exports = router;
