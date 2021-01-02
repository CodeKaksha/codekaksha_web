const path = require("path");
require("dotenv").config();
const express = require("express");
var ExpressPeerServer = require("peer").ExpressPeerServer;
const app = express();
const formatMessage = require("./utils/message");

const http = require("http");

const socketio = require("socket.io");

const {
  userJoin,
  getRoomUsers,
  userLeave,
  getCurrentUser,
  setAdmin,   
} = require("./utils/users");

var { nanoid } = require("nanoid");

const server = http.createServer(app);

const io = socketio(server);
function onConnection(socket) {
  socket.on("chala_gaya", () => {
    const user = userLeave(socket.id);
    console.log(user);
    if(user)
    {
      io.to(user.room).emit("user-disconnected", user.username);
      io.to(user.room).emit(
        "message",
        formatMessage("CodeKaksha", `${user.username} has left the chat`)
      );
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
  socket.on("editorChange", (data, room) => {
    socket.to(room).broadcast.emit("changeEdit", data);
  });
  socket.on("compileCode", (data, room) => {
    const credentials = {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
    };
    socket.emit("getCredential", credentials);
  });
  socket.on("give_alert", (room, username) => {
    socket.broadcast.to(room).emit("bhag_gya_lauda", username);
  });
  socket.on("checkId", (room) => {
    console.log(room);
    let users2 = getRoomUsers(room);
    if (users2.length == 0) {
      socket.emit("roomIdChecked", 0);
    } else if (users2 != undefined) {
      socket.emit("roomIdChecked", 1);
    }
  });
  socket.on("changeInCanvas", (data, room) => {
    socket.broadcast.to(room).emit("changeAayoRe", data);
  });
  socket.on("drawing", (data, width, room) => {
    socket.broadcast.to(room).emit("drawing", data, width);
  });

  socket.on("give_id", () => {
    let ID = nanoid(4);
    io.to(socket.id).emit("rec_id", ID);
  });
  socket.on("join-vid", (peerId, username, room) => {
    socket.to(room).broadcast.emit("user-vid-connected", peerId, username);
  });
  socket.on("join-room", (roomId, userId, username,isAdmin) => {
    // console.log(userId);
    if(isAdmin)
    {
      setAdmin(roomId,userId);
    }
    const user = userJoin(userId, username, roomId, socket.id);
    let roomUsers = getRoomUsers(roomId);
    if (roomUsers.length) {
      io.to(roomUsers[0].socketId).emit("data_dijiye", socket.id);
    }
    socket.join(roomId);
    roomUsers = getRoomUsers(roomId);
    // console.log(roomUsers)
    socket.to(roomId).broadcast.emit("user-connected", username, userId);
    io.to(user.room).emit("roomUsers", getRoomUsers(user.room));

    ///// CHAT

    socket.emit("message", formatMessage("CodeKaksha", "Welcome to chat"));

    socket.broadcast
      .to(roomId)
      .emit(
        "message",
        formatMessage("CodeKaksha", `${username} has joined the chat`)
      );
  });
  socket.on("whiteBoard_data", (data, socketId) => {
    io.to(socketId).emit("whiteData", data);
  });
  socket.on("clearBoard", (room) => {
    socket.broadcast.to(room).emit("boardClear");
  });

  socket.on("chatMessage", (userMessage) => {
    // console.log(userMessage)
    const user = getCurrentUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(user.username, userMessage)
      );
      socket.broadcast.to(user.room).emit("toast", "You have a new message");
    }
  });
}

io.on("connection", onConnection);
const PORT = process.env.PORT || 3000;
const host = "0.0.0.0";

app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "public")));
server.listen(PORT, host, function () {
  console.log("Server started.......");
});
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

var nodemailer = require("nodemailer");

app.post("/reportError", (req, res) => {
  var data = req.body;
  data = JSON.stringify(data);
  console.log(data);

  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.GMAIL_ID,
    to: process.env.GMAIL_ID,
    subject: "Error reported",
    html: data,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

var options = {
  debug: true,
  allow_discovery: true,
};
let peerServer = ExpressPeerServer(server, options);
app.use("/peerjs", peerServer);
app.get("*", (req, res) => {
  app.set("views", path.join(__dirname, "error"));
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");
  app.use(express.static(path.join(__dirname, "error")));
});
