const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  moods: [
    {
      moodType: {
        type: String,
        enum: ["happy", "sad", "angry", "neutral"],
      },
      modeCode: {
        type: Number,
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
});

module.exports = mongoose.model("Mood", moodSchema);
