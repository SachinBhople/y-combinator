const asyncHandler = require("express-async-handler")
const fs = require("fs")
const path = require("path")
const { uploads } = require("../util/uplodas")
const Mentorworkshop = require("../model/Mentorworkshop")
const cloudinary = require("../util/cloudinaryconfig")



// exports.addMentorWorkshop = asyncHandler(async (req, res) => {
//     uploads(req, res, async err => {
//         if (err) {
//             console.log(err);
//             return res.status(400).json({ message: "unable to upload image" })
//         }
//         console.log(req.user);

//         await Mentorworkshop.create({ ...req.body, hero: req.file.filename, mentorId: req.user })
//         res.status(201).json({ message: "blog create success" })
//     })
// })

exports.addMentorWorkshop = asyncHandler(async (req, res) => {
    uploads(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "upload Error" })
        }
        if (req.file.hero) {
            return res.status(400).json({ message: "Hero Image Is Required" })
        }

        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        await Mentorworkshop.create({ ...req.body, hero: secure_url, mentorId: req.user })
        res.json({ message: "Blog Add Success" })
    })
})



exports.updateMentorworkshop = asyncHandler(async (req, res) => {
    uploads(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "unable to upload image" })
        }
        const { workshopId } = req.params
        if (req.body.remove) {
            console.log(req.body.remove);
            fs.unlinkSync(path.join(__dirname, "..", "uploads", req.body.remove))
            console.log(req.file.filename)
            await Blog.findByIdAndUpdate(workshopId, ({ ...req.body, hero: req.file.filename }))
            res.status(200).json({ message: "blog update sucess" })
        } else {
            console.log(req.body.remove);
            console.log(req.file.filename);
            await Blog.findByIdAndUpdate(workshopId, req.body)
            res.status(200).json({ message: "blog update success" })
        }
    })
})
exports.deletementorWorkshop = asyncHandler(async (req, res) => {
    const { workshopId } = req.params
    const result = await Blog.findById(workshopId)
    fs.unlinkSync(path.join(__dirname, "..", "uploads", result.hero))
    await Mentorworkshop.findByIdAndDelete(workshopId)
    res.status(200).json({ message: "blog delete success" })
})
exports.getmentorWorkshop = asyncHandler(async (req, res) => {
    const result = await Mentorworkshop.find()
    res.status(200).json({ message: "metor workshop fetch success", result })
})