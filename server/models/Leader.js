// models/leaderModel.js
const mongoose = require("mongoose");

// Define the leader schema
const leaderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model from the schema
const Leader = mongoose.model("Leader", leaderSchema);

module.exports = Leader;
