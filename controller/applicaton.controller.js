const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose")
const Application = require("../model/Applicaton");

exports.createApplication = asyncHandler(async (req, res) => {
    const result = await Application.create(req.body)
    res.status(201).json({ message: 'Application created successfully', result });

})


exports.getApplications = asyncHandler(async (req, res) => {
    const result = await Application.find()
    res.status(200).json({ message: "Application Fetch success", result });

})



exports.getApplicationById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("Request ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const result = await Application.findById(new mongoose.Types.ObjectId(id));
        console.log("Query Result:", result);

        if (!result) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json({ message: "Application fetched by ID successfully", result });
    } catch (error) {
        console.error("Error fetching application by ID:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});





exports.getApplicationById = asyncHandler(async (req, res) => {
    const founderId = req.params.id || req.userId;
    // console.log(req.userId);
    console.log(req.params.id);

    if (!founderId) {
        return res.status(400).json({ message: 'Founder ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(founderId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const result = await Application.findOne({ userId: founderId });

        if (!result) {
            return res.status(404).json({ message: 'Founder profile not found' });
        }

        res.status(200).json({ message: 'Founder profile fetch success', result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


















exports.updateApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(req.body);

    await Application.findByIdAndUpdate(id, req.body);

    res.status(200).json({ message: 'Application updated successfully' });

})

exports.deleteApplication = asyncHandler(async (req, res) => {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
        return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: 'Application deleted successfully' });
})



