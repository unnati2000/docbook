const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    let mood = await Mood.findOne({ user: req.userId });
    if (!mood) {
      mood = new Modal({
        user: req.userId,
        moods: [
          {
            moodType: req.body.moodType,
            moodScore: req.body.moodScore,
            moodDate: req.body.moodDate,
            description: req.body.description,
          },
        ],
      });
    } else {
      mood = mood.findOneAndUpdate(
        { user: req.userId },
        { $push: { moods: req.body } },
        { new: true }
      );
      return res.json({ msg: "Recorded successfully", mood });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
