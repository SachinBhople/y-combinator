const asyncHandler = require("express-async-handler")
const Founder = require("../model/Founder")
const Auth = require("../model/Auth")
const Blog = require("../model/Blog")
const { uploads } = require("../util/uplodas")
const fs = require("fs")
const path = require("path")
const cloudinary = require("../util/cloudinaryconfig")

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


// exports.addBlog = asyncHandler(async (req, res) => {
//     uploads(req, res, async err => {
//         if (err) {
//             console.log(err);
//             return res.status(400).json({ message: "unable to upload image" })
//         }
//         console.log(req.user);

//         await Blog.create({ ...req.body, hero: req.file.filename })
//         res.status(201).json({ message: "blog create success" })
//     })
// })

exports.addBlog = asyncHandler(async (req, res) => {
    uploads(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "upload Error" })
        }
        if (req.file.hero) {
            return res.status(400).json({ message: "Hero Image Is Required" })
        }

        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        const result = await Blog.create({ ...req.body, hero: secure_url })
        res.json({ message: "Blog Add Success" })
    })
})




// exports.updateBlog = asyncHandler(async (req, res) => {
//     uploads(req, res, async err => {
//         if (err) {
//             return res.status(400).json({ message: "unable to upload image" })
//         }
//         const { blogId } = req.params
//         if (req.body.remove) {
//             console.log(req.body.remove);
//             fs.unlinkSync(path.join(__dirname, "..", "uploads", req.body.remove))
//             console.log(req.file.filename)
//             await Blog.findByIdAndUpdate(blogId, ({ ...req.body, hero: req.file.filename }))
//             res.status(200).json({ message: "blog update sucess" })
//         } else {
//             console.log(req.body.remove);
//             console.log(req.file.filename);
//             await Blog.findByIdAndUpdate(blogId, req.body)
//             res.status(200).json({ message: "blog update success" })
//         }
//     })
// })

exports.updateBlog = asyncHandler(async (req, res) => {
    uploads(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "multer error" })
        }
        const { id } = req.params
        if (req.file) {
            const result = await Blog.findById(id)
            await cloudinary.uploader.destroy(path.basename(result.hero))
            const { secure_url } = await cloudinary.uploader.upload(req.file.path)
            await Blog.findByIdAndUpdate(id, { caption: req.body.caption, hero: secure_url })
            res.json({ message: "Blog update success" })
        } else {
            await Blog.findByIdAndUpdate(id, { caption: req.body.caption })
            res.json({ message: "Blog update success" })
        }

    })
})



// exports.deleteBlog = asyncHandler(async (req, res) => {
//     const { blogId } = req.params
//     const result = await Blog.findById(blogId)
//     fs.unlinkSync(path.join(__dirname, "..", "uploads", result.hero))
//     await Blog.findByIdAndDelete(blogId)
//     res.status(200).json({ message: "blog delete success" })
// })

exports.deleteBlog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Blog.findById(id);
        if (!result) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        await cloudinary.uploader.destroy(path.basename(result.hero));
        await Blog.findByIdAndDelete(id)
        res.json({ message: 'Carousel deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});


exports.getBlog = asyncHandler(async (req, res) => {
    const result = await Blog.find()
    res.status(200).json({ message: "metor workshop fetch success", result })
})



