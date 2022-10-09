
const express = require('express');
var router = express.Router();
const {GetCourses} =  require("../controllers/CourseController");
const {verifyToken}  = require("../utils/verifyToken");

router.get('/',verifyToken,GetCourses)

module.exports = router;