const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
    cname: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    founderLocation: {
        type: String,
        required: true
    },
    founderContact: {
        type: String,
        required: true
    },
    marketSize: {
        type: Number,
        required: true
    },
    turnover: {
        type: Number,
        required: true
    },
    company_stage: {
        type: String,
        enum: [
            'idea',
            'pre-seed',
            'seed',
            'series-a',
            'series-b-plus',
            'expansion',
            'mature'
        ],
        required: true
    },
    wmake: {
        type: String,
        required: true
    },
    vision: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "auth",
        required: true
    },
    applicationStatus: {
        type: String,
        default: "submit",
        enum: ["Inprocess", "submit", "Accecpt", "reject"],
    }

});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
