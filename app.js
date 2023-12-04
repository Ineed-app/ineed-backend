const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const cors = require("cors");
const dotenv = require("dotenv");
const app = express()
const { initializeApp, applicationDefault } = require('firebase-admin/app');
// const https = require("https")
// const http = require("http")
// const fs = require('fs')

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

app.listen(3000, () => {
    console.log('server up and running')
})