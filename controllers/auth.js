const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const usernames = require('marvel-dc-name-generator');


// Register
exports.register = async(req, res) => {
    try {
        console.log("I am in")
        if (!req.body.device_id)
            return res.status(400).send({ message: "please enter name" });
        if (!req.body.fcm_token)
            return res.status(400).send({ message: "please enter mobile number" });

        // const device_id = await Auth.findOne({ device_id: req.body.device_id });
        // if (device_id) {
        //     return res.status(400).json({ mes: "User Already Exist. Please Login" });
        // }
        await new Promise(resolve => setTimeout(resolve, 1000));

        const auth = await Auth({
            device_id: req.body.device_id,
            fcm_token: req.body.fcm_token,
            name: usernames.generate(),
            role: 1
        });

        // console.log(usesr)
        const token = jwt.sign({ user: auth }, process.env.JWT_TOKEN_SECRET);
        // console.log(token)
        if (await auth.save()) {
            console.log(auth)
            response.user = auth;
            response.token = token;
            return res.status(200).json(response);
        } else {
            return res.status(400).json({ message: "auth not saved" });
        }

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// Test
exports.test = async(req, res) => {
    return res.status(200).json({ message: "Test successful" });
};