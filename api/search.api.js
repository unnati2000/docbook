const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const User = require("../models/user.models");
const Doctor = require("../models/doctor.models");

// search by location

router.get("/:location/:speciality", auth, async (req, res) => {
  try {
    const { location, speciality } = req.params;

    const doctors = await Doctor.find({
      $or: [{ speciality: { $regex: speciality, $options: "i" } }],
    }).populate("user");

    const data = doctors.filter(
      (doctor) => doctor.user.address.city != location
    );

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
