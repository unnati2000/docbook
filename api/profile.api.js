const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const User = require("../models/user.models");

router.put("/update", auth, async (req, res) => {
  try {
    console.log(req.body);
    const { password, newPassword } = req.body;

    let user = await User.findById(req.userId).select("+password");

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized to access this route" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be atleast 6 characters long" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ msg: "Password updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.userId);
  } catch (error) {}
});

module.exports = router;
