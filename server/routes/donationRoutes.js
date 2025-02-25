const express = require("express");
const {
  createDonation,
  updateDonation,
  getDonation,
} = require("../controllers/donationController");

const router = express.Router();

// POST /api/donations/add - Add new donation details
router.post("/add", createDonation);

// PUT /api/donations/update - Update existing donation details
router.put("/update", updateDonation);

// GET /api/donations/get - Fetch donation details
router.get("/get", getDonation);

module.exports = router;
