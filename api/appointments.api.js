const Appointment = require("../models/appointment.models");
const User = require("../models/user.models");
const auth = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const Razorpay = require("razorpay");
const { sendMessage } = require("../utils-server/chat");
const {
  bookingNotification,
  acceptedAppointmentNotification,
  cancelledAppointmentByPatient,
  addRatingNotification,
} = require("../utils-server/notification");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/", auth, async (req, res) => {
  try {
    let appointment = new Appointment({
      doctor: req.body.doctor,
      user: req.body.user,
      date: req.body.date,
      timeSlot: req.body.timeSlot,
      fee: parseInt(req.body.fee),
      day: req.body.day,
    });

    appointment = await appointment.save();

    const fee = appointment.fee;
    const feeInPaise = fee * 100;

    const options = {
      amount: feeInPaise,
      currency: "INR",
      receipt: appointment._id,
    };

    const response = await razorpay.orders.create(options);
    appointment.paymentDetails.razorpayOrderId = response.id;

    appointment = await appointment.save();

    await bookingNotification(req.body.doctor, req.body.user, appointment._id);

    res.status(201).json({
      newAppointment: appointment,
      msg: "Appointment created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/today", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user.role !== "doctor") {
      return res.status(401).send("Unauthorized to access this route");
    }

    const appointments = await Appointment.find({
      doctor: req.userId,
      date: moment().format("DD-MM-YYYY"),
      isConfirmed: true,
      isAccepted: true,
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
      isConfirmed: false,
    }).populate("user");

    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/statistics", auth, async (req, res) => {
  try {
    const allAppointments = await Appointment.find({
      doctor: req.userId,
    }).populate("user doctor");

    const acceptedAppointment = await Appointment.find({
      doctor: req.userId,
      isAccepted: true,
      isPaid: true,
    });

    const rejectedAppointment = await Appointment.find({
      doctor: req.userId,
      isAccepted: false,
      isConfirmed: true,
    });

    return res
      .status(200)
      .json({ allAppointments, acceptedAppointment, rejectedAppointment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/user/today", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.userId,
      date: moment().format("DD-MM-YYYY"),
      isConfirmed: true,
      isAccepted: true,
      isPaid: true,
      isOver: false,
    }).populate("doctor");

    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.body.id);

    if (req.body.status === "confirm") {
      appointment.isConfirmed = true;
      appointment.isAccepted = true;
    } else if (req.body.status === "cancel") {
      appointment.isConfirmed = true;
      appointment.isAccepted = false;
    }

    const updatedAppointment = await appointment.save();

    if (updatedAppointment.isAccepted === true) {
      await sendMessage(
        req.userId,
        req.body.user,
        "Hi there! Your appointment is booked successfully. If you have any queries, please contact us."
      );

      await acceptedAppointmentNotification(
        req.body.user,
        req.userId,
        updatedAppointment._id,
        "accepted"
      );
    } else {
      await acceptedAppointmentNotification(
        req.body.user,
        req.userId,
        updatedAppointment._id,
        "cancelled"
      );
    }

    res
      .status(200)
      .json({ updatedAppointment, msg: "Appointment updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    if (appointment.isConfirmed) {
      return res.status(400).json({ msg: "Appointment already confirmed" });
    } else {
      await Appointment.findByIdAndDelete(req.params.id);

      await cancelledAppointmentByPatient(
        req.userId,
        appointment.doctor,
        appointment._id
      );
      res.status(200).json({ msg: "Appointment deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
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

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ user: req.UserId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const appointment = await Appointment.find({
      user: req.userId,
    }).populate("doctor");

    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/over", auth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.body.id);

    if (!appointment) {
      return res.status(404).json({ msg: "Not found" });
    }

    appointment.isOver = true;
    await appointment.save();
    await addRatingNotification(
      appointment.user,
      appointment.doctor,
      appointment._id
    );

    return res.status(200).json({ msg: "Appointment completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
