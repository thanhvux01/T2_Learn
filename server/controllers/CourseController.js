const Course = require("../models/Course");

const GetAllCourse = async (req,res)  => {
  try{
  const courses =  await Course.find({});
  res.status(200).send(courses)
  }
  catch(err){
    console.log(err);
  }
}
const CreateCouse = async (req,res) => {
try{

const {name,description,image,excercise} = req.body;
const excerciseOBJ = JSON.parse(excercise); 
//console.log(excerciseOBJ);
const course = new Course({
    name,
    description,
    image,
    excercise:excerciseOBJ,
})
 await course.save();
 res.status(200).send("Success");
}
catch(err){
  console.log(err);
}
}

module.exports = {GetAllCourse,CreateCouse};