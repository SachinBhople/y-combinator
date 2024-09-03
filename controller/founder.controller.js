const asyncHandler = require("express-async-handler")
const Founder = require("../model/Founder")
const Auth = require("../model/Auth")
const mongoose = require("mongoose")
exports.createFounderProfile = asyncHandler(async (req, res) => {
    const result = await Founder.create(req.body)
    res.json({ message: "founder profile create success", result })
})


exports.getfounderProfile = asyncHandler(async (req, res) => {
    const founderId = req.params.id || req.userId;

    if (!founderId) {
        return res.status(400).json({ message: 'Founder ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(founderId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const result = await Founder.findOne({ userId: founderId });

        if (!result) {
            return res.status(404).json({ message: 'Founder profile not found' });
        }

        res.status(200).json({ message: 'Founder profile fetch success', result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});



exports.updatefounderProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id);

    await Founder.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "Founder profile Update success" })
})
exports.deletefounderProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Founder.findByIdAndDelete(id)
    res.status(200).json({ message: "Founder profile Delete success" })
})