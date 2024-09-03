const cofoundercontroller = require("../controller/cofounder.controller")
const { AdminProtected } = require("../middleware/Protected")

const router = require("express").Router()

router

    .get("/cofounders/search", AdminProtected, cofoundercontroller.searchCofounders)
module.exports = router 