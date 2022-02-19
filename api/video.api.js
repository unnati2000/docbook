const Appointment = require("../models/appointment.models");
const User = require("../models/user.models");
const auth = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  jwt.sign(
    {
      access_key: process.env.HMS_ACCESS_KEY,
      type: "management",
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000),
    },
    process.env.HMS_ACCESS_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "24h",
      jwtid: uuid4(),
    },
    function (err, token) {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json(token);
      }
    }
  );
});

module.exports = router;
