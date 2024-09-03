const founderController = require("../controller/founder.controller")


const router = require("express").Router()

router

    .post("/create-founder-profile", founderController.createFounderProfile)
    .get("/get-founder-profile/:id", founderController.getfounderProfile)
    .put("/update-founder-profile/:id", founderController.updatefounderProfile)
    .delete("/delete-founder-profile", founderController.deletefounderProfile)


module.exports = router 