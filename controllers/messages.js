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