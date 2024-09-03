const mongoose = require("mongoose")

const bookWorkshopschma = new mongoose.Schema({
    founder: {
        type: mongoose.Types.ObjectId,
        ref: "auth",
        required: true
    },
    workshops: {
        type: [mongoose.Types.ObjectId],
        ref: "mentorworkshop",

    },
})

module.exports = mongoose.model("bookworkshop", bookWorkshopschma)