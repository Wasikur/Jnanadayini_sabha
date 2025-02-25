const Contact = require("../models/Contact");

// Function to handle POST request for contact information
const createContact = async (req, res) => {
  const { phoneNumber, whatsappNumber, emailAddress } = req.body;

  try {
    const newContact = new Contact({
      phoneNumber,
      whatsappNumber,
      emailAddress,
    });

    await newContact.save();
    res
      .status(201)
      .json({ message: "Contact information submitted successfully!" });
  } catch (error) {
    console.error("Error saving contact information:", error);
    res.status(500).json({
      message: "Failed to submit contact information. Please try again.",
    });
  }
};

// Function to handle GET request for fetching all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contacts from the database
    res.status(200).json(contacts); // Send the contacts as a response
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch contacts. Please try again." });
  }
};

// Function to handle PUT request for updating contact information
const updateContact = async (req, res) => {
  const { phoneNumber, whatsappNumber, emailAddress } = req.body;

  try {
    // Update the contact information. This assumes there is only one contact.
    const updatedContact = await Contact.findOneAndUpdate(
      {}, // If there's only one document, an empty filter finds that document
      { phoneNumber, whatsappNumber, emailAddress },
      { new: true } // Return the updated document
    );

    if (updatedContact) {
      res.status(200).json({
        message: "Contact information updated successfully!",
        updatedContact,
      });
    } else {
      res.status(404).json({ message: "Contact not found." });
    }
  } catch (error) {
    console.error("Error updating contact information:", error);
    res.status(500).json({ message: "Failed to update contact information." });
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContact,
};
