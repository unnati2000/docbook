const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notifications: [
    {
      type: {
        type: "String",
        enum: ["booked", "accepted", "cancelled", "paid"],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = mongoose.model("Notification", notificationSchema);
