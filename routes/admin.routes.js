const AdminController = require("../controller/admin.Controller")


const router = require("express").Router()

router

    .get("/get-all-founder", AdminController.getAllfounder)
    .get("/get-all-mentor", AdminController.getAllMentor)
    .put("/toggle-account/:id", AdminController.founderAccountToggle)
    .put("/active-account/:id", AdminController.founderAccountActive)

module.exports = router 