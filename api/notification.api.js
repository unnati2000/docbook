const express = require("express");
const router = express.Router();

const User = require("../models/user.models");
const Notification = require("../models/notification.models");

const auth = require("../middleware/auth.middleware");

// @route   GET /api/notifications
// @desc    Retreive user's notifications
router.get("/", auth, async (req, res) => {
  try {
    const user = await Notification.findOne({ user: req.userId }).populate(
      "notifications.user"
    );

    const notifications = user.notifications.filter(
      (notification) =>
        notification.type === "booked" ||
        notification.type === "accepted" ||
        notification.type === "cancelled" ||
        notification.type === "paid"
    );

    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   POST /api/notifications
// @desc    Set notifications to read
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.unreadNotification) {
      user.unreadNotification = false;
      await user.save();
    }
    res.status(200).json({ msg: "Updated unread notification status" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
