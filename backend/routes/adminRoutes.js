const express = require("express")
const router = express.Router()
const {getAllStudents,deleteStudent} = require("../controllers/adminController")

router.get("/students",getAllStudents)
router.delete("/students/:id",deleteStudent)
module.exports = router;