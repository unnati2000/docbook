const Appointment = require("../models/appointment.models");
const User = require("../models/user.models");
const auth = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();

// Route: Get appointment by date

router.get("/:id", auth, async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const appointment = await Appointment.find({
            doctor: req.params.id,
            date: req.query.date,
        });

        
        res.status(200).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});




module.exports = router;