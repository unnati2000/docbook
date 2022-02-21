const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moods: [
    {
      moodType: {
        type: String,
        enum: ["happy", "sad", "angry", "neutral"],
        required: true,
      },
      moodScore: {
        type: Number,
        required: true,
      },
      moodDate: {
        type: Date,
        default: Date.now,
      },
      description: {
        type: String,
      },
    },
  ],
  average: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Mood", moodSchema);