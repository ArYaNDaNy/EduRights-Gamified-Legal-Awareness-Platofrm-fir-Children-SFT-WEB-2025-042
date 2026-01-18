const express = require("express")
const router = express.Router()
const {getAllStudents,deleteStudent,createModule,createLevel} = require("../controllers/adminController")

router.get("/students",getAllStudents)
router.delete("/students/:id",deleteStudent)
router.post("/modules",createModule)
router.post("/levels",createLevel)
module.exports = router;