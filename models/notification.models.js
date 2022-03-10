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
        enum: [
          "booked",
          "accepted",
          "cancelled",
          "cancelledByPatient",
          "rating",
        ],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: {
        type: "String",
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
