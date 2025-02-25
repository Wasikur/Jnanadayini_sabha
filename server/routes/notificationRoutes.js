const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  addNotification,
  editNotification,
  deleteNotification,
} = require("../controllers/notificationController");

// Route to get all notifications, optionally with a search filter
router.get("/", getAllNotifications);

// Route to add a new notification
router.post("/", addNotification);

// Route to edit a notification by ID
router.put("/:id", editNotification);

// Route to delete a notification by ID
router.delete("/:id", deleteNotification);

module.exports = router;
