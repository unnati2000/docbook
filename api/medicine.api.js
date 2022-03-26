const auth = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();

const Medicine = require("../models/medicine.models");

router.post("/", auth, async (req, res) => {
  try {
    let medicine = await Medicine.findOne({ user: req.userId });

    if (!medicine) {
      medicine = new Medicine({
        user: req.userId,
        medicine: [
          {
            name: req.body.name,
            time: req.body.time,
            day: req.body.day,
            frequency: req.body.frequency,
          },
        ],
      });

      await medicine.save();
    } else {
      medicine.medicine.unshift({
        name: req.body.name,
        time: req.body.time,
        day: req.body.day,
        frequency: req.body.frequency,
      });

      await medicine.save();
    }

    return res.status(201).json({ msg: "Recorded successfully", medicine });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOne({ user: req.userId }).populate(
      "user"
    );

    return res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
