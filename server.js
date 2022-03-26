const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });
const connectDB = require("./utils-server/connectDB");

const {
  addUser,
  removeUser,
  findConnectedUser,
} = require("./utils-server/socket");

const {
  loadMessages,
  sendMessage,
  setMessageToUnread,
  setMessageToRead,
} = require("./utils-server/chat");

const PORT = process.env.PORT || 3000;
app.use(express.json());

connectDB();

io.on("connection", (socket) => {
  socket.on("join", async ({ userId }) => {
    const users = await addUser(userId, socket.id);
    await setMessageToRead(userId);
    setInterval(() => {
      socket.emit("connectedUsers", {
        users: users.filter((user) => user.userId !== userId),
      });
    }, 10000);
  });

  socket.on("loadMessages", async ({ userId, messagesWith }) => {
    const { chat, error } = await loadMessages(userId, messagesWith);
    if (!error) {
      socket.emit("messagesLoaded", { chat });
    } else {
      socket.emit("noChatFound");
    }
  });

  socket.on("newMessage", async ({ userId, receiver, message }) => {
    const { newMessage, error } = await sendMessage(userId, receiver, message);
    const receiverSocket = await findConnectedUser(receiver);
    if (receiverSocket) {
      io.to(receiverSocket.socketId).emit("newMessageReceived", { newMessage });
    } else {
      await setMessageToUnread(receiver);
    }
    if (!error) {
      socket.emit("messageSent", { newMessage });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

app.use(function(req, res, next) {
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
  app.use("/api/chats", require("./api/chat.api"));
  app.use("/api/notifications", require("./api/notification.api"));
  app.use("/api/ratings", require("./api/rating.api"));
  app.use("/api/medicine", require("./api/medicine.api"));
  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Express server running on ${PORT}`);
  });
});
