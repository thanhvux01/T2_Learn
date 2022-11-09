const Course = require("../models/Course");
const Lesson = require("../models/Lesson")

const GetAllCourse = async (req,res)  => {
  try{
  const courses =  await Course.find({});
  res.status(200).send(courses)
  }
  catch(err){
    console.log(err);
  }
}
const CreateCourse = async (req,res) => {
try{

const {name,description,image,Lesson} = req.body;
const LessonJSON = JSON.parse(Lesson); 
//console.log(excerciseOBJ);
const course = new Course({
    name,
    description,
    image,
    Lesson:LessonJSON,
})
 await course.save();
 res.status(200).send("Success");
}
catch(err){
  console.log(err);
}
}
const CreateLesson = async (req,res) => {
  try{
  
  const {name,id,content} = req.body;
  //const contentObj = JSON.parse(content); 
  //console.log(excerciseOBJ);
  const lesson = new Lesson({
      name,
      id,
      content:[
        {"type":"vocal","content":{"word1":"Cat","word2":"Pig","word3":"Horse","result":"Cat","meaning":"Mèo"}},
      {"type":"vocal","content":{"word1":"Rabbit","word2":"Duck","word3":"Cat","result":"Duck","meaning":"Vịt"}},
      {"type":"vocalNoimage","content":{"word1":"Rabbit","word2":"Donkey","word3":"Cat","result":"Cat","meaning":"Mèo"}},
      {"type":"vocalNoimage","content":{"word1":"Chicken","word2":"Pig","word3":"Duck","result":"Duck","meaning":"Vịt"}},
      {"type":"vocal","content":{"word1":"Cow","word2":"Cat","word3":"Chicken","result":"Chicken","meaning":"Gà"}},
      {"type":"vocal","content":{"word1":"Pig","word2":"Cat","word3":"Horse","result":"Pig","meaning":"Heo"}},
      {"type":"vocalNoimage","content":{"word1":"Cow","word2":"Cat","word3":"Chicken","result":"Chicken","meaning":"Gà"}},
      {"type":"vocalNoimage","content":{"word1":"Pig","word2":"Cat","word3":"Horse","result":"Pig","meaning":"Heo"}},
      {"type":"pronoun","content":{"word1":"Cat","word2":"Pig","word3":"Horse","result":"Cat","meaning":"Mèo"}},
      {"type":"pronoun","content":{"word1":"Rabbit","word2":"Duck","word3":"Cat","result":"Duck","meaning":"Vịt"}},
    ],
      
  })
   await lesson.save();
   res.status(200).send("Success");
  }
  catch(err){
    console.log(err);
  }
  }
  const GetLesson = async (req,res) => {
    try{
    const {id} = req.body;
    const lesson = await Lesson.find({"id":id,});
    if(lesson.length > 0)
    res.status(200).send(lesson);
    else
    res.status(404).send("Not Found");
    }
    catch(err){
      console.log(err);
    }
  }

module.exports = {GetAllCourse,CreateCourse,CreateLesson,GetLesson};