const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const User = require("../models/user.models");
const Doctor = require("../models/doctor.models");

router.get("/:search", async (req, res) => {
  try {
    const search = req.params.search;
    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { address: { city: { $regex: search, $options: "i" } } },
      ],
      role: "doctor",
      isVerfiied: true,
    }).populate("doctor");

    const doctors = await Doctor.find({
      $or: [{ speciality: { $regex: search, $options: "i" } }],
      initialFee: { $ne: 0 },
    }).populate("user");

    res.status(200).send({ users, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// search by location

router.get("/:location/:speciality", async (req, res) => {
  try {
    const { location, speciality } = req.params;

    const doctors = await Doctor.find({
      speciality: { $regex: speciality, $options: "i" },
    }).populate("user");

    const data = doctors.filter(
      (doctor) =>
        doctor.user.address.city.toLowerCase() === location.toLowerCase()
    );

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
