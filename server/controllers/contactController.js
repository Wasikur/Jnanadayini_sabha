const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("Received email data:", { name, email, subject, message });

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // SMTP host
    port: process.env.SMTP_PORT, // SMTP port
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your SMTP user (authenticated user)
      pass: process.env.SMTP_PASS, // Your SMTP password
    },
  });

  // Email options
  const mailOptions = {
    from: `"Website Enquiry Form" <${email}>`, // Set a custom name and the user's email
    to: process.env.SMTP_USER, // Replace with your email
    subject: subject,
    text: `You have a new message from ${name} (${email}): \n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email." });
  }
};

module.exports = { sendEmail };
