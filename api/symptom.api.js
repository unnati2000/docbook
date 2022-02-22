const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const Symptom = require("../models/symptom.models");

router.post("/", auth, async (req, res) => {
  try {
    let symptom = await Symptom.findOne({ user: req.userId });
    if (!symptom) {
      symptom = new Symptom({
        user: req.userId,
        symptoms: [
          {
            symptomType: req.body.symptomType,
            description: req.body.description,

            date: req.body.date,
            time: req.body.time,
          },
        ],
      });
      await symptom.save();
    } else {
      symptom = await Symptom.findOneAndUpdate(
        { user: req.userId },
        { $push: { symptoms: req.body } },
        { new: true }
      );
      await symptom.save();
    }

    res.status(201).json({ msg: "Recorded successfully", symptom });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const symptom = await Symptom.findOne({ user: req.userId }).populate(
      "user"
    );
    res.status(200).json(symptom);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
