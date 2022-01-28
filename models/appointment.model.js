const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    timeSlot: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    day: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", appointmentSchema);