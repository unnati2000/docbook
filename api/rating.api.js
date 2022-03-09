const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const Rating = require("../models/rating.models");

router.post("/", auth, async (req, res) => {
  try {
    const rating = await Rating.create({
      user: req.userId,
      doctor: req.body.doctor,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    await rating.save();
    return res.status(200).json({ msg: "Rating submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const ratings = await Rating.findOne({ doctor: req.params.id });
    return res.status(200).json(ratings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
