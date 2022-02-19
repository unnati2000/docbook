const router = require("express").Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const axios = require("axios");

const auth = require("../middleware/auth.middleware");
const Appointment = require("../models/appointment.models");

router.post("/:appointmentId", auth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({ msg: "No appointment found " });
    }

    const { razorpay_payment_id, razorpay_signature } = req.body;

    const razorpayOrderId = appointment.paymentDetails.razorpayOrderId;
    const razorpayPaymentId = razorpay_payment_id;
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest === razorpay_signature) {
      appointment.isPaid = true;
      appointment.paymentDetails.razorpayPaymentId = razorpayPaymentId;
      appointment.paymentDetails.razorpaySignature = razorpay_signature;

      appointment = await appointment.save();

      jwt.sign(
        {
          access_key: process.env.HMS_ACCESS_KEY,
          type: "management",
          version: 2,
          iat: Math.floor(Date.now() / 1000),
          nbf: Math.floor(Date.now() / 1000),
        },
        process.env.HMS_APP_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "24h",
          jwtid: v4(),
        },
        async function (err, token) {
          if (err) {
            res.status(400).json({ msg: "Error in generating token" });
          } else {
            let body = JSON.stringify({
              name: "test",
            });

            let config = {
              method: "post",
              url: "https://prod-in2.100ms.live/api/v2/rooms",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              data: body,
            };

            axios(config)
              .then(function (response) {
                appointment.roomId = response.data.id;
                appointment.save();
                res.status(200).json({ appointment });
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      );
    } else {
      res.status(401).json({ msg: "Invalid signature" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
