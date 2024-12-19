const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    questions: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
    },
    durationQuestion: {
        type: Number,
        default: 15, // default 15'
    },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
