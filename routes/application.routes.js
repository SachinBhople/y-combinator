const applicationController = require("../controller/applicaton.controller");
const { AdminProtected } = require("../middleware/Protected");



const router = require("express").Router()


router
    .post('/create-applications', AdminProtected, applicationController.createApplication)
    .get('/applications', applicationController.getApplications)
    .get('/get-applications/:id', applicationController.getApplicationById)
    .put('/update-applications/:id', applicationController.updateApplication)
    .delete('/delete-applications/:id', applicationController.deleteApplication)

module.exports = router;
