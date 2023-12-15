const Service = require("../models/Services");
const jwt = require("jsonwebtoken");
const { response } = require("express");



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