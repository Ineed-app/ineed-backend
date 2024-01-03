const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

// const userslist_schema = new mongoose.Schema({

// })

const schema = new mongoose.Schema({
    suggestion_id: Number,
    suggestion: {
        type: String,
        required: true,
        index: "text"
    },
    clicks: {
        type: Number,
        required: false,
        default: 1
    },
    users: [{
        device_id: String
    }]
}, { timestamps: true });

schema.plugin(autoIncrement, { inc_field: `suggestion_id` });
const Suggestion = mongoose.model("suggestions", schema);

module.exports = Suggestion;