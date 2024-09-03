const authController = require("../controller/auth.Controller")
const { AdminProtected } = require("../middleware/Protected")

const router = require("express").Router()

router

    .post("/register", authController.Register)
    .post("/login", authController.Login)
    .post("/logout", authController.logout)
    .get("/getuser", AdminProtected, authController.getallUser)
// .get("/getuser", AdminProtected, authController.getallUser)

module.exports = router 