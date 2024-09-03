
const mongoose = require("mongoose")

const mentorSchma = new mongoose.Schema({

    mentorName: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    exprience: {
        type: Number,
        required: true
    },
    mentorId: {
        type: mongoose.Types.ObjectId,
        ref: "auth",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("mentor", mentorSchma)