const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const User = require("../models/user.models");
const Doctor = require("../models/doctor.models");

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params.id;
    const doctor = await Doctor.find({ user: id });
    console.log("doctor", doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ user: req.userId });

    if (!doctor) {
      return res.status(400).json({
        msg: "Doctor profile does not exist",
      });
    }

    doctor.timings.sunday.to = req.body.sunday.to;
    doctor.timings.sunday.from = req.body.sunday.from;
    doctor.timings.sunday.markAsHoliday = req.body.sunday.markAsHoliday;

    doctor.timings.monday.to = req.body.monday.to;
    doctor.timings.monday.from = req.body.monday.from;
    doctor.timings.monday.markAsHoliday = req.body.monday.markAsHoliday;

    doctor.timings.tuesday.to = req.body.tuesday.to;
    doctor.timings.tuesday.from = req.body.tuesday.from;
    doctor.timings.tuesday.markAsHoliday = req.body.tuesday.markAsHoliday;

    doctor.timings.wednesday.to = req.body.wednesday.to;
    doctor.timings.wednesday.from = req.body.wednesday.from;
    doctor.timings.wednesday.markAsHoliday = req.body.wednesday.markAsHoliday;

    doctor.timings.thursday.to = req.body.thursday.to;
    doctor.timings.thursday.from = req.body.thursday.from;
    doctor.timings.thursday.markAsHoliday = req.body.thursday.markAsHoliday;

    doctor.timings.friday.to = req.body.friday.to;
    doctor.timings.friday.from = req.body.friday.from;
    doctor.timings.friday.markAsHoliday = req.body.friday.markAsHoliday;

    doctor.timings.saturday.to = req.body.saturday.to;
    doctor.timings.saturday.from = req.body.saturday.from;
    doctor.timings.saturday.markAsHoliday = req.body.saturday.markAsHoliday;

    doctor.experience = parseInt(req.body.initialFee);

    await doctor.save();

    res.status(200).json({ msg: "Doctor details added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
