const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const router = express.Router();
const User = require("../models/user.models");
const sendEmail = require("../utils-server/sendEmail");

router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be atleast 6 characters long" });
    }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(401).json({ msg: "Already have an account" });
    }

    user = new User({
      name,
      email: email.toLowerCase(),
      password,
      role,
    });

    user.password = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const verificationUrl = `${req.protocol}://${req.get("host")}/onboarding/${
      user.role
    }/${verificationToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Docbook - Account Verification",
        html: `<p>Click on this link to complete further process: ${verificationUrl} </p>`,
      });
      console.log("Email send to", user.email);
    } catch (err) {
      console.log(err);
      user.verificationToken = undefined;
      await user.save();
      return res.status(500).json({ msg: "Error sending verification email" });
    }

    await user.save();

    jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        msg: "Please check your email to verify your registration",
        token,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
