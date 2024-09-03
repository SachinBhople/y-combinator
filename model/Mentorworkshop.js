const mongoose = require("mongoose")

const mentorWorkshopSchma = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    hero: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    mentorId: {
        type: mongoose.Types.ObjectId,
        ref: "auth",
        required: true
    },


}, { timestamps: true })

module.exports = mongoose.model("mentorworkshop", mentorWorkshopSchma)