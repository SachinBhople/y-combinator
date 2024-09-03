const mentorWorkshopController = require("../controller/mentorworkshop.controller")
const { AdminProtected } = require("../middleware/Protected")

const router = require("express").Router()

router

    .get("/mentorship", mentorWorkshopController.getmentorWorkshop)
    .post("/add-mentor-workshop", AdminProtected, mentorWorkshopController.addMentorWorkshop)
    .put("/update-mentor-workshop/:workshopId", mentorWorkshopController.updateMentorworkshop)
    .delete("/delete-mentor-workshop/:workshopId", mentorWorkshopController.deletementorWorkshop)

module.exports = router