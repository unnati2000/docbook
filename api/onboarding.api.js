const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const User = require('../models/user.models');
const Doctor = require('../models/doctor.models');
const Chat = require('../models/chat.models');
const Notification = require('../models/notification.models');

const onboardingUpload = require('../middleware/upload.middleware');

router.post('/:token', onboardingUpload, async (req, res) => {
  try {
    const { token } = req.params;

    const { streetAdd, city, state, pincode } = JSON.parse(req.body.address);

    const verificationToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    if (req.files) {
      user.profilePic = req.files.image[0].location;
    }

    user.address.streetAdd = streetAdd;
    user.address.city = city;
    user.address.state = state;
    user.address.pincode = pincode;

    // Set user verified to true
    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    if (user.role === 'doctor') {
      if (!req.files) {
        return res
          .status(401)
          .json({ msg: 'Upload profile pic and required documents' });
      }

      const doctor = new Doctor({
        user: user._id,
        experience: req.body.experience,
        proficiencies: JSON.parse(req.body.proficiencies),
        speciality: req.body.speciality,
        legalDocuments: req.files.document[0].location,
      });

      await doctor.save();

      user.doctor = doctor._id;
      await user.save();
    }

    await new Chat({ user: user._id, chats: [] }).save();
    await new Notification({
      user: user._id,
      notification: [],
    }).save();

    res.status(200).json({ msg: 'Onboarded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
