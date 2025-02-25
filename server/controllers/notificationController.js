const Notification = require("../models/notificationSchema");

// Get all notifications (with optional search filter)
const getAllNotifications = async (req, res) => {
  try {
    const { search = "" } = req.query;
    const notifications = await Notification.find({
      text: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// Add a new notification
const addNotification = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Message text is required" });
  }

  try {
    const newNotification = new Notification({ text });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: "Error adding notification", error });
  }
};

// Edit an existing notification by id
const editNotification = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Message text is required" });
  }

  try {
    const updatedNotification = await Notification.findOneAndUpdate(
      { id }, 
      { text, updatedAt: Date.now() },
      { new: true } 
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: "Error editing notification", error });
  }
};

// Delete a notification by id
const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findOneAndDelete({ id });

    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error });
  }
};

// Export the controller functions
module.exports = {
  getAllNotifications,
  addNotification,
  editNotification,
  deleteNotification,
};
