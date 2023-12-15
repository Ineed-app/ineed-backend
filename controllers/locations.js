const Location = require("../models/Location");
const jwt = require("jsonwebtoken");
const { response } = require("express");



// Save Current Location
exports.current_location = async(req, res) => {
    try {
        if (!req.body.clat)
            return res.status(400).send({ message: "Invalid clat" });
        if (!req.body.clng)
            return res.status(400).send({ message: "Invalid clng" });

        const location = await Location.findOne({ device_id: req.device_id });
        if (location) {
            const updatelocation = await Location.updateOne({ device_id: req.device_id }, {
                $set: {
                    lat: req.body.clat,
                    lng: req.body.clng
                }
            });
            if (updatelocation)
                return res.status(200).json({ message: "updated" });
            else
                return res.status(400).json({ message: "something went wrong" });
        } else {
            const newlocation = await Location({
                device_id: req.device_id,
                lat: req.body.clat,
                lng: req.body.clng
            });
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (newlocation.save())
                return res.status(200).json({ message: "updated" });
            else
                return res.status(400).json({ message: "something went wrong" });
        }

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// Delete Current Location
exports.del_clocation = async(req, res) => {
    try {

        const location = await Location.findOne({ device_id: req.device_id });
        if (location) {
            const del_location = await Location.deleteOne({ device_id: req.device_id });
            if (del_location)
                return res.status(200).json({ message: "Deleted" });
            else
                return res.status(400).json({ message: "something went wrong" });
        } else {
            return res.status(400).json({ message: "Already deleted" });
        }

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// Get Locations
exports.get_locations = async(req, res) => {
    try {
        const locations = await Location.aggregate([{
            $lookup: {
                from: "users",
                localField: "device_id",
                foreignField: "device_id",
                as: "user",
            },
        }]);
        if (locations) {
            return res.status(200).json(locations);
        } else {
            return res.status(400).json({ message: "No Locations" });
        }

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};