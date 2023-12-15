const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    servicecatid: Number,
    title: {
        type: String,
        required: false,
    },
}, { timestamps: true });

schema.plugin(autoIncrement, { inc_field: `servicecatid` });
const Servicecat = mongoose.model("servicecat", schema);

module.exports = Servicecat;