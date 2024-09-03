const blogController = require("../controller/admin.Controller")

const router = require("express").Router()

router

    .get("/blog", blogController.getBlog)
    .post("/add-blog", blogController.addBlog)
    .put("/update-blog/:blogId", blogController.updateBlog)
    .delete("/delete-blog/:blogId", blogController.deleteBlog)

module.exports = router