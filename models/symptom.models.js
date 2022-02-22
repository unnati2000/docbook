const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  symptoms: [
    {
      symptomType: {
        type: String,

        enum: [
          "headache",
          "fever",
          "cough",
          "sore throat",
          "runny nose",
          "nausea",
          "vomiting",
          "diarrhea",
          "loss of appetite",
          "loss of taste",
          "loss of smell",
        ],
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
