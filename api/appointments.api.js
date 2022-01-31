const Appointment = require("../models/appointment.models");
const User = require("../models/user.models");
const auth = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();
const moment = require("moment");

// Route: Get appointment by date

router.post("/", auth, async (req, res) => {
  try {
    const appointment = new Appointment({
      doctor: req.body.doctor,
      user: req.body.user,
      date: req.body.date,
      timeSlot: req.body.timeSlot,
      fee: req.body.fee,
      day: req.body.day,
    });

    const newAppointment = await appointment.save();
    res
      .status(201)
      .json({ newAppointment, msg: "Appointment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/today", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user.role !== "doctor") {
      return res.status(404).send("Unauthorized to access this route");
    }

    const appointments = await Appointment.find({
      doctor: req.userId,
      date: moment().format("DD-MM-YYYY"),
    }).populate("user");

    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/unchecked", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user.role !== "doctor") {
      return res.status(404).send("Unauthorized to access this route");
    }

    const appointments = await Appointment.find({
      doctor: req.userId,
      confirmed: false,
    }).populate("user");

    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const appointment = await Appointment.findById(req.body.id);

    if (req.body.status === "confirm") {
      appointment.confirmed = true;
    } else if (req.body.status === "cancel") {
      appointment.cancelled = true;
    }

    const updatedAppointment = await appointment.save();

    res
      .status(200)
      .json({ updatedAppointment, msg: "Appointment updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const appointment = await Appointment.find({
      doctor: req.params.id,
      date: req.query.date,
    });

    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
