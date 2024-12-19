const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    order: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: [
            {
                order: {
                    type: Number,
                    required: true,
                },
                answer: {
                    type: String,
                    required: true,
                },
                isCorrect: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        required: true,
    },
});

module.exports = mongoose.model("Question", questionSchema);
