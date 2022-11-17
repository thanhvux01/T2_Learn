
const express = require('express');
var router = express.Router();
const {GetAllCourse,CreateCourse,CreateLesson,GetLesson,Revision} = require("../controllers/CourseController");
const {verifyToken}  = require("../utils/verifyToken");

router.get('/get-all',verifyToken,GetAllCourse);
router.post('/create-course',CreateCourse);
router.post('/create-lesson',CreateLesson);
router.post('/get-lesson',GetLesson);
router.get('/revision',verifyToken,Revision);
module.exports = router;