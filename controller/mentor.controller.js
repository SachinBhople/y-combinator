const asyncHandler = require("express-async-handler")
const Auth = require("../model/Auth")
const mongoose = require("mongoose")
const Mentor = require("../model/Mentor")
const BookWorkshop = require("../model/BookWorkshop")

exports.createMentorProfile = asyncHandler(async (req, res) => {
    await Mentor.create(req.body)
    res.json({ message: "Mentor profile create success" })
})


exports.getMentorProfile = asyncHandler(async (req, res) => {
    const mentorId = req.params.id || req.userId;

    if (!mentorId) {
        return res.status(400).json({ message: 'Mentor ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    console.log(mentorId);

    try {
        const result = await Mentor.findOne({ mentorId: mentorId });

        if (!result) {
            return res.status(404).json({ message: 'Mentor profile not found' });
        }

        res.status(200).json({ message: 'Mentor profile fetch success', result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});



exports.updateMentorProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id);

    await Mentor.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "Mentor profile Update success" })
})
exports.deleteMentroProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Mentor.findByIdAndDelete(id)
    res.status(200).json({ message: "Mentor profile Delete success" })
})
exports.getallbookworkshop = asyncHandler(async (req, res) => {
    const result = await BookWorkshop.find()
    res.status(200).json({ message: "Mentor profile Delete success", result })
})