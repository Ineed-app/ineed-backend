const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");
const Room = require("./room");

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);

const io = new Server(server);

const room = new Room();

io.on("connection", async(socket) => {
    console.log(socket.id)
    console.log("roomID")
    const roomID = await room.joinRoom();
    console.log(roomID)
        // join room
    socket.join(roomID);

    socket.on("send-message", (message) => {
        socket.to(roomID).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
        // leave room
        room.leaveRoom(roomID);
    });
});

server.on("error", (err) => {
    console.log("Error opening server");
});

server.listen(8001, () => {
    console.log("Server working on port 8001");
});