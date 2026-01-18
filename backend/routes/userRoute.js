const express = require("express")
const router = express.Router()
const {getTotalStudents} = require("../controllers/userController")
router.get("/students/count",getTotalStudents)
module.exports = router