const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    day: {
      type: String,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentDetails: {
      razorpayPaymentId: {
        type: String,
      },
      razorpayOrderId: {
        type: String,
      },
      razorpaySignature: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
