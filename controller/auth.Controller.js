const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Auth = require("../model/Auth")

exports.Register = asyncHandler(async (req, res) => {
    const { name, role, email, password } = req.body

    if (!['admin', 'founder', "mentor"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }
    const hash = await bcrypt.hash(password, 10)
    const isFound = await Auth.findOne({ email })
    if (isFound) {
        return res.status(400).json({ message: "Email Already registered with us" })
    }
    await Auth.create({ ...req.body, password: hash })
    res.status(200).json({ message: "user Register success" })

})

exports.Login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body
    const result = await Auth.findOne({ email })

    if (!result) {
        return res.status(400).json({ message: "email not found" })
    }
    console.log(password);
    console.log(result.password);

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(400).json({ message: "password do not match" })
    }

    const token = jwt.sign({ UserId: result._id }, process.env.JWT_KEY, { expiresIn: "15d" })
    res.cookie("auth", token, { maxAge: 60 * 60 * 60 * 15, httpOnly: true })
    console.log(req.cookies);

    res.status(200).json({ message: "user Login success", result: { name: result.name, _id: result._id, role: result.role, isActive: result.isActive } })

})


exports.getallUser = asyncHandler(async (req, res) => {
    const result = await Auth.find()
    res.status(200).json({ message: "user fetch success", result })
})

exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("auth")
    res.status(200).json({ message: "Admin Logut Sucess" })
})



