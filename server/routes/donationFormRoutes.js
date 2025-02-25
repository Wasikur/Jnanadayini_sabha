const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationFormController");

// Route to add a donation
router.post("/add", donationController.addDonation);

// Route to get all donations
router.get("/", donationController.getAllDonations);

// Route to get a single donation by ID
router.get("/:id", donationController.getDonationById);

module.exports = router;
