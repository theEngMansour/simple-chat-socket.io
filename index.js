import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

io.on("connection", (socket) => {
  socket.emit("message", "Welcome in main group");
  socket.on("message", (msg) => io.emit("message", msg));
});

const js = io.of("/js");
js.on("connection", (socket) => {
  socket.emit("message", "Welcome in js group");
  socket.on("message", (msg) => js.emit("message", msg));
});

const php = io.of("/php");
php.on("connection", (socket) => {
  socket.emit("message", "Welcome in php group");
  socket.on("message", (msg) => php.emit("message", msg));
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});