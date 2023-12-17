const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    message_id: Number,
    sender_id: {
        type: String,
        required: true,
    },
    receiver_id: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, { timestamps: true });

schema.plugin(autoIncrement, { inc_field: `message_id` });
const Message = mongoose.model("messages", schema);

module.exports = Message;