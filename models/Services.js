const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    serviceid: Number,
    name: {
        type: String,
        required: true,
    },
    servicecatid: {
        type: Number,
        required: true
    }
}, { timestamps: true });

schema.plugin(autoIncrement, { inc_field: `serviceid` });
const Service = mongoose.model("services", schema);

module.exports = Service;