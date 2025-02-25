const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" }, // Add reference to Album
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
