const founderController = require("../controller/founder.controller")
const { AdminProtected } = require("../middleware/Protected")


const router = require("express").Router()

router

    .post("/create-founder-profile", AdminProtected, founderController.createFounderProfile)
    .get("/get-founder-profile/:id", founderController.getfounderProfile)
    .put("/update-founder-profile/:id", founderController.updatefounderProfile)
    .delete("/delete-founder-profile", founderController.deletefounderProfile)


module.exports = router 