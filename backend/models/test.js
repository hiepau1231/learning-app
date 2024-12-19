const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subSection: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
            required: true,
        },
        questions: {
            type: [Object],
            required: true,
        },
        totalIsCorrect: {
            type: Number,
            required: true,
        },
        totalIsFailed: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Test", testSchema);
