const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    initialFee: {
      type: Number,
      default: 0,
      required: true,
    },
    speciality: {
      type: String,
      enum: [
        "Dentist",
        "Gynecologist",
        "General Physician",
        "Dermatologist",
        "Ear-nose-throat (ent) Specialist",
        "Homoepath",
        "Ayurveda",
        "Cardiologist",
        "Neurologist",
        "Orthopedic",
        "Dietician",
        "Physiotherapist",
      ],
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
      required: true,
    },
    timings: {
      sunday: {
        from: String,
        to: String,
        markAsHoliday: false,
      },
      monday: {
        from: String,
        to: String,
        markAsHoliday: false,
      },
      tuesday: {
        from: String,
        to: String,
        markAsHoliday: false,
      },
      wednesday: {
        from: String,
        to: String,
        markAsHoliday: false,
      },
      thursday: {
        from: String,
        to: String,
        markAsHoliday: false,
      },
      friday: {
        from: String,
        to: String,
        markAsHoliday: false,
      },
      saturday: {
        from: String,
        to: String,
        markAsHoliday: false,
      },
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
