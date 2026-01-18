const express = require("express")
const router = express.Router()
const {getAllModules} = require("../controllers/moduleController")
router.get("/",getAllModules)
module.exports = router