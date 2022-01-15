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

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup.api"));
  app.use("/api/auth", require("./api/auth.api"));
  app.use("/api/onboarding", require("./api/onboarding.api"));
  app.use("/api/doctor", require("./api/doctor.api"));
  app.use("/api/search", require("./api/search.api"));
  app.all("*", (req, res) => handle(req, res));
  server.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Express server running on ${PORT}`);
  });
});
