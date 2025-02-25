const Donation = require("../models/Donation");

// Function to handle POST request for creating a new donation
const createDonation = async (req, res) => {
  const { bank, branch, ifscCode, accountNumber } = req.body;

  try {
    const newDonation = new Donation({ bank, branch, ifscCode, accountNumber });
    await newDonation.save();
    res
      .status(201)
      .json({ message: "Donation details submitted successfully!" });
  } catch (error) {
    console.error("Error saving donation details:", error);
    res.status(500).json({
      message: "Failed to submit donation details. Please try again.",
    });
  }
};

// Function to handle PUT request for updating existing donation
const updateDonation = async (req, res) => {
  const { bank, branch, ifscCode, accountNumber } = req.body;

  try {
    const updatedDonation = await Donation.findOneAndUpdate(
      {},
      { bank, branch, ifscCode, accountNumber },
      { new: true } // Return the updated document
    );

    if (updatedDonation) {
      res.status(200).json({
        message: "Donation details updated successfully!",
        updatedDonation,
      });
    } else {
      res.status(404).json({ message: "Donation details not found." });
    }
  } catch (error) {
    console.error("Error updating donation details:", error);
    res.status(500).json({ message: "Failed to update donation details." });
  }
};

// Function to handle GET request for fetching donation details
const getDonation = async (req, res) => {
  try {
    const donation = await Donation.findOne(); // Assuming only one donation record for simplicity
    if (!donation) {
      return res.status(404).json({ message: "No donation details found." });
    }
    res.status(200).json(donation);
  } catch (error) {
    console.error("Error fetching donation details:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch donation details. Please try again." });
  }
};

module.exports = {
  createDonation,
  updateDonation,
  getDonation,
};
