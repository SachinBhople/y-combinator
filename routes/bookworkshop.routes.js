const bookworkshopcontroller = require("../controller/bookworkshop.controller")
const { AdminProtected } = require("../middleware/Protected")


const router = require("express").Router()

router

    .get("/workshop", AdminProtected, bookworkshopcontroller.getWorkshopById)
    .get("/workshops", AdminProtected, bookworkshopcontroller.getWorkshop)
    .post("/book-workshop", bookworkshopcontroller.bookworkshop)



module.exports = router 