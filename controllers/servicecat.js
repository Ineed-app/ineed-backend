const Servicecat = require("../models/ServiceCat");
const jwt = require("jsonwebtoken");
const { response } = require("express");



// Post Servicecat
exports.post_servicecat = async(req, res) => {
    try {
        if (!req.body.title)
            return res.status(400).send({ message: "Title is missing" });

        const servicecat = await Servicecat.findOne({ title: req.body.title });
        if (servicecat) {
            return res.status(400).json({ message: "Service Category already exists" });
        }

        const newservicecat = await Servicecat({
            title: req.body.title
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (newservicecat.save())
            return res.status(200).json({ message: "Service Category Created" });
        else
            return res.status(400).json({ message: "something went wrong" });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// Delete Current Servicecat
exports.del_servicecat = async(req, res) => {
    try {
        if (!req.params.servicecatid)
            return res.status(400).json({ message: "servicecatid is Missing" });

        const servicecat = await Servicecat.findOne({ servicecatid: req.params.servicecatid });
        if (servicecat) {
            const del_servicecat = await Servicecat.deleteOne({ servicecatid: req.params.servicecatid });
            if (del_servicecat)
                return res.status(200).json({ message: "Service Category Deleted" });
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
exports.getall_servicecat = async(req, res) => {
    try {
        const servicecat = await Servicecat.find();
        if (servicecat) {
            return res.status(200).json(servicecat);
        } else {
            return res.status(400).json({ message: "No Service Categories Found" });
        }

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

//Update Service Category
exports.update_servicecat = async(req, res) => {
    try {
        if (!req.params.servicecatid)
            return res.status(400).json({ message: "Service Catergory ID is Missing" });
        if (!req.body.title)
            return res.status(400).send({ message: "Title is missing" });

        const servicecat = await Servicecat.findOne({ servicecatid: req.params.servicecatid });
        if (servicecat) {
            const del_servicecat = await Servicecat.updateOne({ servicecatid: req.params.servicecatid }, { $set: { title: req.body.title } });
            if (del_servicecat)
                return res.status(200).json({ message: "Service Category Deleted" });
            else
                return res.status(400).json({ message: "something went wrong" });
        } else {
            return res.status(400).json({ message: "Already deleted" });
        }


    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

// Get All Service Categories and services
exports.getall_servicecat_services = async(req, res) => {
    try {
        const servicecat = await Servicecat.aggregate([{
            $lookup: {
                from: "services",
                localField: "servicecatid",
                foreignField: "servicecatid",
                as: "services",
            },
        }]);
        if (servicecat) {
            return res.status(200).json(servicecat);
        } else {
            return res.status(400).json({ message: "No Service Categories Found" });
        }

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};