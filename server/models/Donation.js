const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    bank: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
