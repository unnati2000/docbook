const express = require("express");
const router = express.Router();
const User = require("../models/user.models");

router.get("/", auth, async (req, res) => {});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Please enter password greater than 6" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ msg: "Please verify your email before trying to log in" });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
