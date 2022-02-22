const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symptoms: [
    {
      symptom: {
        type: String,
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
