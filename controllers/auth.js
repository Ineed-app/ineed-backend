const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const usernames = require('marvel-dc-name-generator');
const { set } = require("mongoose");


// Register
exports.register = async(req, res) => {
    try {
        console.log("I am in")
        if (!req.body.device_id)
            return res.status(400).send({ message: "please enter device_id" });
        if (!req.body.fcm_token)
            return res.status(400).send({ message: "please enter fcm_token" });

        const existing_user = await Auth.findOne({ device_id: req.body.device_id });
        if (existing_user) {
            const token1 = jwt.sign({ user: existing_user }, process.env.JWT_TOKEN_SECRET);
            response.user = existing_user;
            response.token = token1;
            return res.status(202).json(response);
        }
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

// Register
exports.updatename = async(req, res) => {
    try {

        if (!req.body.name)
            return res.status(400).send({ message: "please enter name" });

        const updatename = await Auth.updateOne({ device_id: req.device_id }, {
            $set: {
                name: req.body.name
            }
        });

        if (updatename)
            return res.status(200).json({ message: "Updated Successfully" });
        else
            return res.status(400).json({ message: "auth not saved" });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// user
exports.getuser = async(req, res) => {
    try {
        const user = await Auth.findOne({ device_id: req.device_id });

        if (user)
            return res.status(200).json({ user: user });
        else
            return res.status(400).json({ message: "Try again" });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// Test
exports.test = async(req, res) => {
    return res.status(200).json({ message: "Test successful" });
};