const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symptoms: [
    {
      name: {
        type: String,
        required: true,
      },

      age: {
        type: Number,
        required: true,
      },

      gender: {
        type: String,
        required: true,
      },
      part: {
        type: String,
        required: true,
      },
      symptom: {
        type: String,
        required: true,
      },
      severity: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Symptom", symptomSchema);
