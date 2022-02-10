const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user.models");
const Doctor = require("./models/doctor.models");
const Appointment = require("./models/appointment.models");

dotenv.config({ path: "./config.env" });

const doctors = [
  {
    // rajesh
    user: "6204139f8c804bbd036b3dc3",
    proficiences: ["MBBS", "MS General Surgery"],
    legalDocuments: "docs",
    initialFee: 400,
    speciality: "General Physician",
    experience: 10,
  },
  {
    // saurav
    user: "6204139f8c804bbd036b3dc5",
    proficiences: ["BDS"],
    legalDocuments: "docs",
    initialFee: 500,
    speciality: "Dentist",
    experience: 8,
  },
  {
    // prtik
    user: "6204139f8c804bbd036b3dc4",
    proficiences: ["MBBS", "MS General Surgery"],
    legalDocuments: "docs",
    initialFee: 300,
    speciality: "General Physician",
    experience: 6,
  },
  {
    // john
    user: "6204139f8c804bbd036b3dc0",
    proficiences: ["MBBS", "MD Dermatology"],
    legalDocuments: "docs",
    initialFee: 700,
    speciality: "Dermatologist",
    experience: 12,
  },
  {
    // jane
    user: "6204139f8c804bbd036b3dc2",
    proficiences: ["MBBS", "MD General Medicine"],
    legalDocuments: "docs",
    initialFee: 700,
    speciality: "General Physician",
    experience: 12,
  },
];

const appt = [
  {
    doctor: "61f4e21bf5120e98633154d3",
    user: "61f50effd3846cce5c7b1a5b",
    date: "29-01-2022",
    fee: 200,
    timeSlot: "18:17",
    day: "saturday",
  },
  {
    doctor: "61f4e21bf5120e98633154d3",
    user: "61f50effd3846cce5c7b1a5b",
    date: "31-01-2022",
    fee: 200,
    timeSlot: "11:47",
    day: "monday",
  },
  {
    doctor: "61f4e21bf5120e98633154d3",
    user: "61f50effd3846cce5c7b1a5b",
    date: "01-02-2022",
    fee: 200,
    timeSlot: "13:46",
    day: "tuesday",
  },
  {
    doctor: "61f4e21bf5120e98633154d3",
    user: "61f50effd3846cce5c7b1a5b",
    date: "03-02-2022",
    fee: 200,
    timeSlot: "10:45",
    day: "thursday",
  },
];

const users = [
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "123456",
    role: "doctor",
    isVerified: true,
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    address: {
      streetAdd: "Near Dmart, Kandivali West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400101",
    },
  },
  {
    name: "Yati Sharma",
    email: "yatisharma1603@gmail.com",
    password: "123456",
    role: "patient",
    isVerified: true,
    profilePic:
      "https://image.shutterstock.com/image-photo/profile-picture-smiling-millennial-asian-260nw-1836020740.jpg",
    address: {
      streetAdd: "Near airport",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600020",
    },
  },
  {
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    password: "123456",
    role: "doctor",
    isVerified: true,
    profilePic:
      "https://image.shutterstock.com/image-photo/profile-picture-smiling-millennial-asian-260nw-1836020740.jpg",
    address: {
      streetAdd: "Near lake",
      city: "Ahemdabad",
      state: "Gujarat",
      pincode: "600020",
    },
  },
  {
    name: "Rajesh Kootrapali",
    email: "rajeshk@gmail.com",
    password: "123456",
    role: "doctor",
    isVerified: true,
    profilePic:
      "https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg",
    address: {
      streetAdd: "Near Chandani chowk",
      city: "Delhi",
      state: "Delhi",
      pincode: "600020",
    },
  },
  {
    name: "Prateek Sharma",
    email: "prateeksharma@gmail.com",
    password: "123456",
    role: "doctor",
    isVerified: true,
    profilePic:
      "https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg",
    address: {
      streetAdd: "Near MCD",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "600020",
    },
  },
  {
    name: "Saurav Kumar",
    email: "sauravk@gmail.com",
    password: "123456",
    role: "patient",
    isVerified: true,
    profilePic:
      "https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg",
    address: {
      streetAdd: "Near Jama Masjid",
      city: "Hyderabad",
      state: "Andhra Pradesh",
      pincode: "600020",
    },
  },
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    const docs = await Doctor.create(doctors);

    console.log(docs);

    const user = await Promise.all(
      docs?.map(async (doc) => {
        console.log(doc);
        await User.findOneAndUpdate({ _id: doc.user }, { doctor: doc._id });
      })
    );
    console.log(user);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
