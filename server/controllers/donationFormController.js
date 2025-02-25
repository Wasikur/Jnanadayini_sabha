const DonationForm = require("../models/DonationForm");

// Controller to add a donation
exports.addDonation = async (req, res) => {
  try {
    const donationData = req.body; // Get data from the request body
    const donation = new DonationForm(donationData); // Create a new instance
    await donation.save(); // Save to the database
    res.status(201).json({ message: "Donation added successfully", donation });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add donation", details: error.message });
  }
};

// Controller to get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await DonationForm.find(); // Fetch all donations
    res.status(200).json(donations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch donations", details: error.message });
  }
};

// Controller to get a single donation by ID
exports.getDonationById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route params
    const donation = await DonationForm.findById(id); // Find donation by ID
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.status(200).json(donation);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch donation", details: error.message });
  }
};
