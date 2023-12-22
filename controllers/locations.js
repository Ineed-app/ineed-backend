const { Location, locationSchema } = require("../models/Location");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const { Schema } = require("mongoose");



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
                    location: {
                        coordinates: [req.body.clat, req.body.clng]
                    }
                }
            });
            if (updatelocation)
                return res.status(200).json({ message: "updated" });
            else
                return res.status(400).json({ message: "something went wrong" });
        } else {
            const newlocation = await Location({
                device_id: req.device_id,
                location: {
                    coordinates: [req.body.clat, req.body.clng]
                }
            });
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (newlocation.save())
                return res.status(200).json({ message: "created" });
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
        if (!req.body.clat)
            return res.status(400).send({ message: "Invalid clat" });
        if (!req.body.clng)
            return res.status(400).send({ message: "Invalid clng" });
        // const locations = await Location.aggregate([{
        //     lat: { $near: [16.2163167, 80.1920921], $maxDistance: 0.10 }
        // }, {
        //     $lookup: {
        //         from: "users",
        //         localField: "device_id",
        //         foreignField: "device_id",
        //         as: "user",
        //     },
        // }]);

        const locations = await Location.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [req.body.clat, req.body.clng]
                    },
                    $maxDistance: 1000,
                    $minDistance: 1
                }
            }
        });

        var finres = [];

        console.log(locations.length)
        for (let index = 0; index < locations.length; index++) {
            var element = locations[index];
            let tempelement = {
                "_id": element._id,
                "device_id": element.device_id,
                "location": [{
                    "type": element.location.type,
                    "coordinates": element.location.coordinates,
                    "_id": element.location._id
                }],
                "createdAt": element.createdAt,
                "updatedAt": element.updatedAt,
                "location_id": element.location_id
            }
            finres.push(tempelement)
        }


        if (locations) {
            return res.status(200).json({ "locations": finres });
        } else {
            return res.status(400).json({ message: "No Locations" });
        }

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

exports.trylocation = async(req, res) => {

    // const subcoordinates = new Schema({
    //     type: Schema.Types.Array,

    // })

    const newlocation = await Location({
        device_id: "device11",
        location: {
            coordinates: [16.216370, 80.192051]
        }
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (newlocation.save())
        return res.status(200).json({ message: "updated" });
    else
        return res.status(400).json({ message: "something went wrong" });

};

exports.testlocation = async(req, res) => {

    // const result = await Location.cre({ "location": "2dsphere" });
    // if (result) {
    // console.log(result)
    const newlocation = await Location.find([{
            $match: {
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [16.216309837215306, 80.19219693708251]
                        },
                        $maxDistance: 3000,
                        $minDistance: 1
                    }
                },
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "device_id",
                foreignField: "device_id",
                as: "user",
            }
        },
    ]);

    // const newlocation = await Location.find({ location: { $near: { $geometry: { type: 'Point', coordinates: [16.216309837215306, 80.19219693708251] }, $maxDistance: 3000, $minDistance: 15 } } });
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (newlocation)
        return res.status(200).json(newlocation);
    else
        return res.status(400).json({ message: "something went wrong" });
    // }

};