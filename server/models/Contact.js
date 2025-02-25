const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      //   required: true,
    },
    whatsappNumber: {
      type: String,
      //   required: true,
    },
    emailAddress: {
      type: String,
      lowercase: true,
      //   required: true,
      //   unique: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
