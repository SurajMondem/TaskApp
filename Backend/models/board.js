const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const allList = new mongoose.Schema({
    list: {
        type: ObjectId,
        ref: "List",
    }
})

const Lists = mongoose.model("Lists", allList);


const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    lists: [allList],
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const Board = mongoose.model("Board", boardSchema); 

module.exports = mongoose.model(Board, Lists);