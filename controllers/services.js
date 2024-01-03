const Service = require("../models/Services");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const Suggestion = require('../models/Suggestion')



// Post Service
exports.post_service = async(req, res) => {
    try {
        if (!req.body.name)
            return res.status(400).send({ message: "name is missing" });
        if (!req.body.servicecatid)
            return res.status(400).send({ message: "servicecatid is missing" });

        const service = await Service.findOne({ name: req.body.name, servicecatid: req.body.servicecatid });
        if (service) {
            return res.status(400).json({ message: "Service already exists" });
        }

        const newservice = await Service({
            name: req.body.name,
            servicecatid: req.body.servicecatid
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (newservice.save())
            return res.status(200).json({ message: "Service Created" });
        else
            return res.status(400).json({ message: "something went wrong" });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// Delete Current Service
exports.del_service = async(req, res) => {
    try {
        if (!req.params.serviceid)
            return res.status(400).json({ message: "serviceid is Missing" });

        const service = await Service.findOne({ serviceid: req.params.serviceid });
        if (service) {
            const del_service = await Service.deleteOne({ serviceid: req.params.serviceid });
            if (del_service)
                return res.status(200).json({ message: "Service Deleted" });
            else
                return res.status(400).json({ message: "something went wrong" });
        } else {
            return res.status(400).json({ message: "Already deleted" });
        }

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// Get All Service Categories
exports.getall_service = async(req, res) => {
    try {
        const service = await Service.find();
        if (service) {
            return res.status(200).json(service);
        } else {
            return res.status(400).json({ message: "No Service Categories Found" });
        }

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

//Update Service
exports.update_service = async(req, res) => {
    try {
        if (!req.params.serviceid)
            return res.status(400).json({ message: "Service ID is Missing" });
        if (!req.body.name)
            return res.status(400).send({ message: "name is missing" });

        const service = await Service.findOne({ serviceid: req.params.serviceid });
        if (service) {
            const del_service = await Service.updateOne({ serviceid: req.params.serviceid }, { $set: { name: req.body.name } });
            if (del_service)
                return res.status(200).json({ message: "Service Deleted" });
            else
                return res.status(400).json({ message: "something went wrong" });
        } else {
            return res.status(400).json({ message: "Already deleted" });
        }


    } catch (error) {
        return res.status(400).json({ message: error });
    }
}


// Get Suggestions
exports.getsuggestions = async(req, res) => {
    try {
        var mysuggestions = "";
        console.log("length: " + req.body.stext.trim().length)
        if (req.body.stext.trim().length != 0) {
            console.log(req.body.stext)
            mysuggestions = await Suggestion.find({ $text: { $search: req.body.stext } }, { score: { $meta: "textScore" } })
                .sort({ score: { $meta: 'textScore' }, clicks: -1 }).limit(4)


        } else {
            console.log("dd" + req.body.stext)
            mysuggestions = await Suggestion.find().sort({ clicks: -1 }).limit(4)

        }

        console.log(mysuggestions)
        if (mysuggestions) {
            return res.status(200).json(mysuggestions);
        } else {
            return res.status(400).json({ message: "No Suggestions Found" });
        }


    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// Get Suggestions
exports.post_suggestion = async(req, res) => {
    try {
        if (!req.body.stext)
            return res.status(400).json({ message: "stext is Missing" });

        const old_suggestion = await Suggestion.findOne({ suggestion: req.body.stext });
        if (old_suggestion) {
            console.log("Old suggestion exists")
            const validate_user = await Suggestion.findOne({ users: { $elemMatch: { device_id: req.device_id } } });
            if (validate_user) {
                console.log("user exists in suggestions, adding only click")
                const update_click = await Suggestion.updateOne({ suggestion: req.body.stext }, { $inc: { clicks: 1 } });
                if (update_click)
                    return res.status(200).json(update_click);
                else
                    return res.status(400).json({ message: "something went wrong" });
            } else {
                console.log("Adding click and User")
                const update_click = await Suggestion.updateOne({ suggestion: req.body.stext }, { $push: { users: [{ device_id: req.device_id }] }, $inc: { clicks: 1 } });
                if (update_click) {
                    return res.status(200).json(update_click);
                } else
                    return res.status(400).json({ message: "something went wrong 2" });
            }
        }

        const new_suggestion = await Suggestion({
            suggestion: req.body.stext,
            users: [{ device_id: req.device_id }]
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (new_suggestion.save()) {
            return res.status(200).json(new_suggestion);

        } else
            return res.status(400).json({ message: "Something went wrong 3" });

        // await new Promise(resolve => setTimeout(resolve, 1000));





    } catch (error) {
        return res.status(400).json({ message: error });
    }
};