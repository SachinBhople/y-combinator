const mongoose = require("mongoose")

const blogSchma = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
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

}, { timestamps: true })

module.exports = mongoose.model("blog", blogSchma)