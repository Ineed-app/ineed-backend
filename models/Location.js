const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    location_id: Number,
    device_id: {
        type: String,
        required: false,
    },
    lat: {
        type: String,
        required: true,
    },
    lng: {
        type: String,
        required: true,
    }
}, { timestamps: true });

schema.plugin(autoIncrement, { inc_field: `location_id` });
const Location = mongoose.model("locations", schema);

module.exports = Location;