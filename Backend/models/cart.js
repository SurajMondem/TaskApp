const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const allBoardsSchema = new mongoose.Schema({
    board: {
        type: ObjectId,
        ref: "board"
    },
});

const allBoards = mongoose.model("allBoards", allBoardsSchema);

const boardCartSchema = new mongoose.Schema(
    {
        boards: [allBoardsSchema],
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
        user: {
            type: ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

const boardCart = mongoose.model("boardCart", boardCartSchema);

module.exports = {allBoards , boardCart};
