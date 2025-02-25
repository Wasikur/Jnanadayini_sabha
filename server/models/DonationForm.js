const mongoose = require("mongoose");

const DonationForm = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    purpose: { type: String, required: true },
    otherPurpose: {
      type: String,
      required: function () {
        return this.purpose === "Others";
      },
    }, // Conditional required
    paymentMode: { type: String, required: true },
    amount: { type: Number, required: true },
    comment: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DonationForm", DonationForm);
