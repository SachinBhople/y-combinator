const asyncHandler = require("express-async-handler")
const Founder = require("../model/Founder")
const Auth = require("../model/Auth")
const Blog = require("../model/Blog")
const { uploads } = require("../util/uplodas")
const fs = require("fs")
const path = require("path")

exports.getAllfounder = asyncHandler(async (req, res) => {
    const result = await Auth.find({ role: "founder" })
    res.status(200).json({ message: "all founder fetch success", result })
})
exports.getAllMentor = asyncHandler(async (req, res) => {
    const result = await Auth.find({ role: "mentor" })
    res.status(200).json({ message: "all founder fetch success", result })
})

exports.founderAccountToggle = asyncHandler(async (req, res) => {

    const { id } = req.params
    await Auth.findByIdAndUpdate(id, { ...req.body, isActive: false })
    res.status(200).json({ message: "founder toggle succss" })

})
exports.founderAccountActive = asyncHandler(async (req, res) => {

    const { id } = req.params
    await Auth.findByIdAndUpdate(id, { ...req.body, isActive: true })
    res.status(200).json({ message: "founder toggle succss" })

})


exports.addBlog = asyncHandler(async (req, res) => {
    uploads(req, res, async err => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "unable to upload image" })
        }
        console.log(req.user);

        await Blog.create({ ...req.body, hero: req.file.filename })
        res.status(201).json({ message: "blog create success" })
    })
})
exports.updateBlog = asyncHandler(async (req, res) => {
    uploads(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "unable to upload image" })
        }
        const { blogId } = req.params
        if (req.body.remove) {
            console.log(req.body.remove);
            fs.unlinkSync(path.join(__dirname, "..", "uploads", req.body.remove))
            console.log(req.file.filename)
            await Blog.findByIdAndUpdate(blogId, ({ ...req.body, hero: req.file.filename }))
            res.status(200).json({ message: "blog update sucess" })
        } else {
            console.log(req.body.remove);
            console.log(req.file.filename);
            await Blog.findByIdAndUpdate(blogId, req.body)
            res.status(200).json({ message: "blog update success" })
        }
    })
})
exports.deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    const result = await Blog.findById(blogId)
    fs.unlinkSync(path.join(__dirname, "..", "uploads", result.hero))
    await Blog.findByIdAndDelete(blogId)
    res.status(200).json({ message: "blog delete success" })
})
exports.getBlog = asyncHandler(async (req, res) => {
    const result = await Blog.find()
    res.status(200).json({ message: "metor workshop fetch success", result })
})



