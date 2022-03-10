const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const Appointment = require("../models/appointment.models");
const User = require("../models/user.models");
const Doctor = require("../models/doctor.models");

router.post("/", auth, async (req, res) => {
  try {
    const appointment = await Appointment.find({
      doctor: req.body.doctor,
      user: req.userId,
    });

    if (appointment.length === 0) {
      return res.status(401).json({
        msg:
          "You can't add review as you haven't booked any appointment with this doctor yet",
      });
    }

    const doctorProfile = await Doctor.findById(req.body.doctorProfile);

    doctorProfile.ratings.unshift({
      user: req.userId,
      name: req.body.name,
      profilePic: req.body.profilePic,
      rating: req.body.rating,
      description: req.body.description,
      tags: req.body.tags,
    });

    let sum = 0;
    doctorProfile.ratings.forEach((rating) => {
      sum += rating.rating;
    });

    doctorProfile.averageRating = sum / doctorProfile.ratings.length;

    await doctorProfile.save();

    res.status(200).json({ msg: "Review added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
