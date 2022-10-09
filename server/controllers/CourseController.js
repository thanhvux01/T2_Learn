const Course = require("../models/Course")

const GetCourses = async (req,res) => {
  
    const courses = await Course.find();
    res.send([courses,req.user]);
}

const CourseController2 = {
    index : (req,res) => res.send("Day la trang khoa hoc 2") 
}

module.exports = {GetCourses}