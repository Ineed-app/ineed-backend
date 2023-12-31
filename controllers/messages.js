const Message = require("../models/Message");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const myapp = require("../app");

const AWS = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");


const s3 = new AWS.S3({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
});

const upload = () =>
    multer({
        storage: multerS3({
            s3: s3,
            ACL: "public-read",
            bucket: process.env.AWS_BUCKET,
            metadata: function(req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function(req, file, cb) {
                cb(null, new Date().toISOString() + "-" + file.originalname);
            },
        }),
    });

// Send Message
exports.send_message = async(data) => {
    try {

        const newmessage = await Message({
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            message: data.message,
            type: data.type,
            anyfile: data.anyfile
        })

        await new Promise(resolve => setTimeout(resolve, 1000));
        if (newmessage.save())
            return;
        else
            return;
    } catch (error) {
        return;
    }
};

exports.getallmessages = async(req, res) => {

    try {
        if (!req.params.receiver_id)
            res.status(400).json({ message: "receiver_id is missing" })

        console.log("i am in controller");

        const messages = await Message.find();

        var res_messages = [];

        for (let index = 0; index < messages.length; index++) {
            const element = messages[index];

            if (element.sender_id == req.device_id && element.receiver_id == req.params.receiver_id)
                res_messages.push(element)
            else if (element.sender_id == req.params.receiver_id && element.receiver_id == req.device_id)
                res_messages.push(element)
        }

        return res.status(200).json(res_messages);
    } catch (error) {
        return res.status(400).json({ message: error });
    }




}