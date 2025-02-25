const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    pageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carousel", carouselSchema);
