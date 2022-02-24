const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const Mood = require("../models/mood.models");

router.post("/", auth, async (req, res) => {
  try {
    let mood = await Mood.findOne({ user: req.userId });

    if (!mood) {
      mood = new Mood({
        user: req.userId,
        moods: [
          {
            moodType: req.body.moodType,
            value: req.body.value,
            date: req.body.date,
            description: req.body.description,
          },
        ],
      });

      await mood.save();

      return res.json({ msg: "Recorded successfully", mood });
    } else {
      mood = await Mood.findOneAndUpdate(
        { user: req.userId },
        { $push: { moods: req.body } },
        { new: true }
      );

      await mood.save();
      return res.json({ msg: "Recorded successfully", mood });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const mood = await Mood.findOne({ user: req.userId }).populate("user");
    return res.json(mood);
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;
