const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const User = require("../models/user.models");
const Doctor = require("../models/doctor.models");

const {
  calculate_time_slot,
  parseTime,
} = require("../utils-server/time-slots");

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findOne({ user: id }).populate("user");

    if (!doctor) {
      return res.status(400).json({ msg: "Doctor not found" });
    }

    return res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ user: req.userId });

    let minutes, hour;

    if (!doctor) {
      return res.status(400).json({
        msg: "Doctor profile does not exist",
      });
    }

    doctor.timings.sunday.from = req.body.sunday.from;
    doctor.timings.sunday.to = req.body.sunday.to;
    doctor.timings.sunday.markAsHoliday = req.body.sunday.markAsHoliday;
    doctor.timeSlots.sunday =
      req.body.sunday.markAsHoliday === false &&
      calculate_time_slot(
        parseTime(req.body.sunday.from),
        parseTime(req.body.sunday.to)
      );

    doctor.timings.monday.to = req.body.monday.to;
    doctor.timings.monday.from = req.body.monday.from;
    doctor.timings.monday.markAsHoliday = req.body.monday.markAsHoliday;
    doctor.timeSlots.monday =
      req.body.monday.markAsHoliday === false &&
      calculate_time_slot(
        parseTime(req.body.monday.from),
        parseTime(req.body.monday.to)
      );

    doctor.timings.tuesday.to = req.body.tuesday.to;
    doctor.timings.tuesday.from = req.body.tuesday.from;
    doctor.timings.tuesday.markAsHoliday = req.body.tuesday.markAsHoliday;
    doctor.timeSlots.tuesday =
      req.body.tuesday.markAsHoliday === false &&
      calculate_time_slot(
        parseTime(req.body.tuesday.from),
        parseTime(req.body.tuesday.to)
      );

    doctor.timings.wednesday.to = req.body.wednesday.to;
    doctor.timings.wednesday.from = req.body.wednesday.from;
    doctor.timings.wednesday.markAsHoliday = req.body.wednesday.markAsHoliday;
    doctor.timeSlots.wednesday =
      req.body.wednesday.markAsHoliday === false &&
      calculate_time_slot(
        parseTime(req.body.wednesday.from),
        parseTime(req.body.wednesday.to)
      );

    doctor.timings.thursday.to = req.body.thursday.to;
    doctor.timings.thursday.from = req.body.thursday.from;
    doctor.timings.thursday.markAsHoliday =
      req.body.thursday.markAsHoliday === false &&
      req.body.thursday.markAsHoliday;
    doctor.timeSlots.thursday = calculate_time_slot(
      parseTime(req.body.thursday.from),
      parseTime(req.body.thursday.to)
    );

    doctor.timings.friday.to = req.body.friday.to;
    doctor.timings.friday.from = req.body.friday.from;
    doctor.timings.friday.markAsHoliday = req.body.friday.markAsHoliday;
    doctor.timeSlots.friday =
      req.body.friday.markAsHoliday === false &&
      calculate_time_slot(
        parseTime(req.body.friday.from),
        parseTime(req.body.friday.to)
      );

    doctor.timings.saturday.to = req.body.saturday.to;
    doctor.timings.saturday.from = req.body.saturday.from;
    doctor.timings.saturday.markAsHoliday = req.body.saturday.markAsHoliday;
    doctor.timeSlots.saturday =
      req.body.saturday.markAsHoliday === false &&
      calculate_time_slot(
        parseTime(req.body.saturday.from),
        parseTime(req.body.saturday.to)
      );

    doctor.experience = parseInt(req.body.initialFee);
    doctor.description = req.body.description;

    await doctor.save();

    res.status(200).json({ msg: "Doctor details added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
