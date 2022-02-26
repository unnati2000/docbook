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
      value: {
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
    },
  ],
});

module.exports = mongoose.model("Mood", moodSchema);
