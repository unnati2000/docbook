const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user.models");
const Doctor = require("./models/doctor.models");

dotenv.config({ path: "./config.env" });

const doctors = [
  {
    user: "61d8636fc421057bbeaabbac",
    proficiences: ["MBBS", "MS General Surgery"],
    legalDocuments: "docs",
    initialFee: 400,
    speciality: "General Physician",
    experience: 8,
    timings: {
      sunday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      monday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      tuesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      wednesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      thursday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      friday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      saturday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
    },
  },
  {
    user: "61d8636fc421057bbeaabbab",
    proficiences: ["BAMS", "MD Dermatology"],
    legalDocuments: "docs",
    initialFee: 400,
    speciality: "Dermatologist",
    experience: 8,
    timings: {
      sunday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      monday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      tuesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      wednesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      thursday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      friday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      saturday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
    },
  },
  {
    user: "61d8636fc421057bbeaabbaf",
    proficiences: ["MBBS", "MS General Surgery"],
    legalDocuments: "docs",
    initialFee: 400,
    speciality: "General Physician",
    experience: 8,
    timings: {
      sunday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      monday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      tuesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      wednesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      thursday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      friday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      saturday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
    },
  },
  {
    user: "61d8636fc421057bbeaabbad",
    proficiences: ["BHMS", "MS ENT"],
    legalDocuments: "docs",
    initialFee: 400,
    speciality: "Ear-nose-throat (ent) Specialist",
    experience: 8,
    timings: {
      sunday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      monday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      tuesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      wednesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      thursday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      friday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      saturday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
    },
  },
  {
    user: "61d8636fc421057bbeaabbae",
    proficiences: ["MBBS", "MS General Surgery"],
    legalDocuments: "docs",
    initialFee: 400,
    speciality: "General Physician",
    experience: 8,
    timings: {
      sunday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      monday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      tuesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      wednesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      thursday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      friday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      saturday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
    },
  },
  {
    user: "61d8636fc421057bbeaabbb0",
    proficiences: ["MBBS", "MS Obstetrics and Gynaecology"],
    legalDocuments: "docs",
    initialFee: 400,
    speciality: "Gynecologist",
    experience: 8,
    timings: {
      sunday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      monday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      tuesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      wednesday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      thursday: {
        from: "10:00",
        to: "12:00",
        markAsHoliday: false,
      },
      friday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
      saturday: {
        from: "",
        to: "",
        markAsHoliday: true,
      },
    },
  },
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    await Doctor.create(doctors);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    process.exit();
    console.log("deleted");
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
