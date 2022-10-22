
const express = require('express');
var router = express.Router();
const {GetAllCourse,CreateCouse} = require("../controllers/CourseController");
const {verifyToken}  = require("../utils/verifyToken");

router.get('/get-all',verifyToken,GetAllCourse);
router.post('/create-course',CreateCouse);

module.exports = router;