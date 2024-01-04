const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    request_id: Number,
    sender_id: {
        type: String,
        required: true,
    },
    receiver_id: {
        type: String,
        required: false,
    },
    suggestion: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    accept: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true });

schema.plugin(autoIncrement, { inc_field: `request_id` });
const Request = mongoose.model("requests", schema);

module.exports = Request;