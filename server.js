const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });
const connectDB = require("./utils-server/connectDB");
const PORT = process.env.PORT || 3000;
app.use(express.json());

connectDB();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup.api"));
  app.use("/api/auth", require("./api/auth.api"));
  app.use("/api/onboarding", require("./api/onboarding.api"));
  app.use("/api/doctor", require("./api/doctor.api"));
  app.use("/api/search", require("./api/search.api"));
  app.use("/api/appointments", require("./api/appointments.api"));
  app.use("/api/payment", require("./api/payment.api"));
  app.use("/api/profile", require("./api/profile.api"));
  app.use("/api/moods", require("./api/mood.api"));
  app.use("/api/symptoms", require("./api/symptom.api"));
  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Express server running on ${PORT}`);
  });
});
