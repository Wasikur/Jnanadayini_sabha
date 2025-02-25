// controllers/leaderController.js
const fs = require("fs");
const path = require("path");
const Leader = require("../models/Leader");

// Add a new leader
exports.addLeader = async (req, res) => {
  const { name, title, description } = req.body;
  const image = req.file ? req.file.path : "";

  try {
    const newLeader = new Leader({
      name,
      title,
      description,
      image,
    });

    const savedLeader = await newLeader.save();
    res.status(201).json(savedLeader);
  } catch (err) {
    res.status(400).json({ message: "Error adding leader", error: err });
  }
};

// Get all leaders
exports.getLeaders = async (req, res) => {
  try {
    const leaders = await Leader.find();
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaders", error: err });
  }
};

// Edit a leader's details
exports.editLeader = async (req, res) => {
  const { id } = req.params;
  const { name, title, description } = req.body;
  let newImagePath = req.file ? req.file.path : undefined;

  try {
    // Find the leader to get the existing image path
    const leader = await Leader.findById(id);
    if (!leader) {
      return res.status(404).json({ message: "Leader not found" });
    }

    // If a new image is uploaded and an old image exists, delete the old image
    if (newImagePath && leader.image) {
      fs.unlink(leader.image, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    // Update leader details
    const updatedLeader = await Leader.findByIdAndUpdate(
      id,
      {
        name,
        title,
        description,
        image: newImagePath || leader.image, // Keep old image if no new one is uploaded
      },
      { new: true }
    );

    res.json(updatedLeader);
  } catch (err) {
    res.status(500).json({ message: "Error updating leader", error: err });
  }
};


// Delete a leader by ID
exports.deleteLeader = async (req, res) => {
  try {
    const { id } = req.params;
    const leader = await Leader.findByIdAndDelete(id);

    if (!leader) {
      return res.status(404).json({ message: "Leader not found" });
    }

    // Optionally delete the leader's image file from the filesystem
    if (leader.image) {
      fs.unlinkSync(leader.image); // Deletes the image file from the server
    }

    res.json({ message: "Leader deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting leader", error: err });
  }
};
