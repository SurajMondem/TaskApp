const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    content: {
        type: String,
        trim: true,
        maxlength: 200
    },
    status: {
        type: Boolean,
    }
}, { timestamps: true});

module.exports = mongoose.model("Card", cardSchema);