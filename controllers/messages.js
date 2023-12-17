const Message = require("../models/Message");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const myapp = require("../app");

// Send Message
exports.send_message = async(data) => {
    try {
        // if (!req.body.receiver_id)
        //     return res.status(400).send({ message: "Invalid receiver_id" });
        // if (!req.body.message)
        //     return res.status(400).send({ message: "Invalid message" });

        const newmessage = await Message({
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            message: data.message
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (newmessage.save())
            return;
        else
            return;

    } catch (error) {
        return;
    }
};