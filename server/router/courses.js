
const express = require('express');
var router = express.Router();
const {GetAllCourse,CreateCourse,CreateLesson,GetLesson,Revision,Revision10,ListCourse,GetCourse, UpdateCourse} = require("../controllers/CourseController");
const {ListLesson,UpdateLesson,GetALesson,AddQuestion} = require("../controllers/LessonController")
const {verifyToken, verifyAdmin}  = require("../utils/verifyToken");


router.get('/get-all',verifyToken,GetAllCourse);
router.post('/create-course',CreateCourse);
router.post('/create-lesson',CreateLesson);
router.post('/get-lesson',GetLesson);
router.get('/revision',verifyToken,Revision);
router.get('/list-course',verifyAdmin,ListCourse);
router.post('/single-course',verifyAdmin,GetCourse);
router.post('/update-course',verifyAdmin,UpdateCourse);
router.get('/list-lesson',verifyAdmin,ListLesson);
router.post('/update-lesson',verifyAdmin,UpdateLesson);
router.post('/single-lesson',verifyAdmin,GetALesson);
router.post('/add-question',verifyAdmin,AddQuestion);







module.exports = router;