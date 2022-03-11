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
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            part: req.body.part,
            symptom: req.body.symptom,
            severity: req.body.severity,
            duration: req.body.duration,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
          },
        ],
      });

      await symptom.save();
    } else {
      symptom.symptoms.unshift({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        part: req.body.part,
        symptom: req.body.symptom,
        severity: req.body.severity,
        duration: req.body.duration,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
      });

      await symptom.save();

      await symptom.save();
    }

    return res.status(201).json({ msg: "Recorded successfully", symptom });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const symptom = await Symptom.findOne({ user: req.userId }).populate(
      "user"
    );

    return res.status(200).json(symptom);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
