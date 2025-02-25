const express = require("express");
const { sendEmail } = require("../controllers/contactController");
const {
  createContact,
  getContacts,
  updateContact,
} = require("../controllers/contactAdminController");

const router = express.Router();

// POST route for submitting the contact form
router.post("/", sendEmail);

// POST /api/contact/add - Add new contact information
router.post("/add", createContact);

// PUT /api/contact/update - Update existing contact information
router.put("/update", updateContact);

// GET /api/contact/get - Fetch all contacts
router.get("/get", getContacts);

module.exports = router;
