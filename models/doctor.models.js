const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      streetAdd: String,
      city: String,
      state: String,
      pincode: String,
    },
    degree: {
      degreeName: String,
      from: String,
      to: String,
      university: String,
    },
    proficiencies: {
      type: [String],
      enum: [
        "MBBS",
        "BDS",
        "BAMS",
        "BUMS",
        "BHMS",
        "BYNS",
        "MD Anaesthesiology",
        "MD Dermatology",
        "MD Family Medicine",
        "MD General Medicine",
        "MD Physiology",
        "MS ENT",
        "MS General Surgery",
        "MS Ophthalmology",
        "MS Orthopaedics",
        "MS Obstetrics and Gynaecology",
        "MS Dermatology, Venerology and Leprosy",
      ],
    },
    legalDocuments: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
