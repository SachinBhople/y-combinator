
const mongoose = require("mongoose")

const founderSchma = new mongoose.Schema({

    companyName: {
        type: String,
        required: true
    },
    founderName: {
        type: String,
        required: true
    },
    turnover: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "auth",
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("founder", founderSchma)