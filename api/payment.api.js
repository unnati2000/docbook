const router = require('express').Router();
const crypto = require('crypto');

const auth = require('../middleware/auth.middleware');
const Appointment = require('../models/appointment.models');

router.post('/:appointmentId', auth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({ msg: 'No appointment found ' });
    }

    const { razorpay_payment_id, razorpay_signature } = req.body;

    const razorpayOrderId = appointment.paymentDetails.razorpayOrderId;
    const razorpayPaymentId = razorpay_payment_id;
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
      appointment.isPaid = true;
      appointment.paymentDetails.razorpayPaymentId = razorpayPaymentId;
      appointment.paymentDetails.razorpaySignature = razorpay_signature;

      appointment = await appointment.save();
      res.status(200).json(appointment);
    } else {
      res.status(401).json({ msg: 'Invalid signature' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
