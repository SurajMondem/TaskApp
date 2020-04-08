const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const messageSchema = new mongoose.Schema ({
    message: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    board: {
        type: ObjectId,
        ref: "Board",
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Message", messageSchema);