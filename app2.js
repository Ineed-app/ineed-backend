const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const cors = require("cors");
const dotenv = require("dotenv");
const app = express()
const { initializeApp, applicationDefault } = require('firebase-admin/app');
// const https = require("https")
const http = require("http")
    // const fs = require('fs')

const server = http.createServer(app)
const io = require('socket.io')(5000);

// env
dotenv.config();

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "./ineed-firebase-private-key.json";
initializeApp({
    credential: applicationDefault(),
    projectId: 'ineed-6f0f3',
});

// middleware
app.use(express.json())
app.use(cors());


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((x) => {
        console.log("Connect to DB");
    })
    .catch((err) => {
        console.error("Error connecting to mongo", err);
    });

app.use("/api/", require("./routes/router"));

io.on('connection', (socket) => {

    console.log('user connected')

    socket.on('join', function(userNickname) {
        console.log(userNickname + " : has joined the chat ");
        socket.broadcast.emit('userjoinedthechat', userNickname + " : has   joined the chat ");
    })
    socket.on('messagedetection', (senderNickname, messageContent) => {
        //log the message in console 
        console.log(senderNickname + " : " + messageContent)
            //create a message object 
        let message = {
                "message": messageContent,
                "senderNickname": senderNickname
            }
            // send the message to all users including the sender  using io.emit    
        io.emit('message', message)
    })
    socket.on('disconnect', function() {
        console.log(userNickname + ' has left ')
        socket.broadcast.emit("userdisconnect", ' user has left')
    })
})

server.listen(3000, () => {
    console.log('server up and running')
})