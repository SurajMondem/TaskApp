const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const allCards = new mongoose.Schema({
    card: {
        type: ObjectId,
        ref: "Card",
    },
})

const Cards = mongoose.model("Cards", allCards);

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
    cards: [allCards] ,
    status: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const List = mongoose.model("List", listSchema);

module.exports = mongoose.model(List, Cards);