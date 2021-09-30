const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.all("*", (req, res) => handle(req, res));
  server.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Express server running on ${PORT}`);
  });
});
