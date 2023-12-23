const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    user_id: Number,
    name: {
        type: String,
        required: false,
    },
    device_id: {
        type: String,
        required: true,
    },
    fcm_token: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true
    },
    basepay: {
        type: String,
        required: false,
        default: "1"
    },
    payfirst: {
        type: Boolean,
        required: false,
        default: true
    }
}, { timestamps: true });

schema.plugin(autoIncrement, { inc_field: `user_id` });
const Auth = mongoose.model("users", schema);

module.exports = Auth;