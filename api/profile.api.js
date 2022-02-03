const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const User = require("../models/user.models");

router.put("/update", auth, async (req, res) => {
  try {
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

router.put("/", auth, upload, async (req, res) => {
  try {
    const { name, email } = req.body;

    const { streetAdd, city, state, pincode } = JSON.parse(req.body.address);

    let user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized to access this route" });
    }

    if (req.file) {
      user.profilePic = req.files.image[0].location;
    }

    user = await User.findOneAndUpdate(
      { _id: req.userId },
      {
        name,
        email,
        address: {
          streetAdd,
          city,
          state,
          pincode,
        },
      },
      { new: true }
    );

    await user.save();

    res.status(200).json({ msg: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
