const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicine: [
      {
        name: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        day: {
          type: String,
          required: true,
        },
        frequency: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps }
);

module.exports = mongoose.model("Medicine", medicineSchema);
