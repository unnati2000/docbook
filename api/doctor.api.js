const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const User = require("../models/user.models");
const Doctor = require("../models/doctor.models");
const Appointment = require("../models/appointment.models");

const {
  calculate_time_slot,
  parseTime,
} = require("../utils-server/time-slots");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findOne({ user: id }).populate("user");

    if (!doctor) {
      return res.status(400).json({ msg: "Doctor not found" });
    }

    res.status(200).json(doctor);
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

    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const { from, to, markAsHoliday } = req.body[day];

      doctor.timings[day].from = from;
      doctor.timings[day].to = to;
      doctor.timings[day].markAsHoliday = markAsHoliday;

      if (markAsHoliday === false) {
        doctor.timeSlots[day] = calculate_time_slot(
          parseTime(from),
          parseTime(to)
        );
      } else {
        doctor.timeSlots[day] = [];
      }
    }

    doctor.initialFee = parseInt(req.body.initialFee);
    doctor.description = req.body.description;

    await doctor.save();

    res.status(200).json({ msg: "Doctor details added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
