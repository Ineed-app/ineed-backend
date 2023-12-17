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

exports.getallmessages = async(data) => {
    console.log("i am in controller", data);

    const messages = await Message.find();

    var res_messages = [];

    for (let index = 0; index < messages.length; index++) {
        const element = messages[index];

        if (element.sender_id == data.sender_id && element.receiver_id == data.receiver_id)
            res_messages.push(element)
        else if (element.sender_id == data.receiver_id && element.receiver_id == data.sender_id)
            res_messages.push(element)
    }

    return res_messages;


}