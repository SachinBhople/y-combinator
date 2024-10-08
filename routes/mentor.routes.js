const mentorController = require("../controller/mentor.controller")
const { AdminProtected } = require("../middleware/Protected")


const router = require("express").Router()

router

    .get("/get-mentor-profile/:id", mentorController.getMentorProfile)
    .post("/create-mentor-profile", AdminProtected, mentorController.createMentorProfile)
    .put("/update-mentor-profile/:id", mentorController.updateMentorProfile)
    .delete("/delete-mentor-profile/:id", mentorController.deleteMentroProfile)


module.exports = router 