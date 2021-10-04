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

console.log(process.env.MONGO_URI);

nextApp.prepare().then(() => {
  app.all("*", (req, res) => handle(req, res));
  server.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Express server running on ${PORT}`);
  });
});
