
const express = require('express')
var router = express.Router()
const {CourseController} =  require("../controllers/CourseController");

router.get('/',CourseController.index)

module.exports = router;