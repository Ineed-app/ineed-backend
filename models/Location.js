const { Double } = require("mongodb");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Point",
        required: true
    },
    coordinates: {
        type: Array,
        required: true
    }
})

const schema = new mongoose.Schema({
    location_id: Number,
    device_id: {
        type: String,
        required: true,
    },
    location: {
        type: locationSchema,
        index: "2dsphere"
    }
}, { timestamps: true });

schema.plugin(autoIncrement, { inc_field: `location_id` });
const Location = mongoose.model("locations", schema);

module.exports = { Location, locationSchema };