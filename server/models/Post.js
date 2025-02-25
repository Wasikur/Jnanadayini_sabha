const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tags: [String],
    coverImage: { type: mongoose.Schema.Types.ObjectId, ref: "CoverImage" },
    bodyText: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
