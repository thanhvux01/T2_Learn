const Course = require("../models/Course");
const Lesson = require("../models/Lesson")
const Flashcard = require("../models/FlashCard")
const Word = require("../models/Word");
const GetAllCourse = async (req,res)  => {
  try{
  const courses =  await Course.find({});
  res.status(200).send(courses)
  }
  catch(err){
    res.status(400).send("ERROR");
    console.log(err);
  }
}
const ListCourse = async (req,res)  => {
  try{
  const courses =  await Course.find({});
  const handlecourses = courses.map((item)=>{
    const courseobj = {
      id:item.courseID,
      price:item.price,
      name:item.name,
      description:item.description,
      image:item.image,
    }
      return courseobj;
  })
  res.status(200).send(handlecourses)
  }
  catch(err){
    res.status(400).send("ERROR");
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
const Revision = async (req,res) => {
  let lesson;
  let word1,word2,word3;
  let number = parseInt(req.query.number);
  console.log(number);
  try{

   const flashcard = await Flashcard.find({userID:req.user.id})
   if(!flashcard){
          return res.status(404).send("Card not found")
    }
    if(number==0)
    number=flashcard.length;
    if(number>flashcard.length){
      return res.status(400).send("BAD REQUEST");
    }
    const listword = await Word.find({});
    const GenerateAnswer = () => {
     word1 = listword[Math.floor(Math.random()*listword.length)]["name"];
     do{
     word2 = listword[Math.floor(Math.random()*listword.length)]["name"];
     }while(word2 == word1 );
    }
    lesson =  flashcard.slice(0,number).map((item,i)=>{
      if(i<number){
     let Rad =  Math.floor(Math.random() * (3 - 0) );

     GenerateAnswer();
     const lessonObj = {
         "type":"vocalNoimage",
         "content":{
         "word1":word1,
         "word2":word2,
         "word3":item.word,
         "result":item.word,
         "meaning":item.meaning,
         }
      }
      if(Rad === 1){
        lessonObj.content.word1 = item.word;
        lessonObj.content.word2 = word1 ;
        lessonObj.content.word3 = word2 ;
        return lessonObj
      }else if (Rad === 2){
        lessonObj.content.word1 = word2;
        lessonObj.content.word2 = item.word
        lessonObj.content.word3 = word2;
        return lessonObj
      }
      return lessonObj
    }
    return 0; 
 })
   res.status(200).send(lesson);
  }catch(err){
    console.log(err);
   res.status(500).send("Error");
  }
}
const GetCourse = async (req,res) => {
  
   try{    
     const course = await Course.findOne({courseID:req.body.courseID});
     if(!course){
      return res.status(404).send("Not Found");
     }
      res.status(200).send(course)
    }catch(err){
      res.status(400).send("Error");
     console.log(err);
   }
}
const UpdateCourse = async (req,res) => {
   try{
    const {courseID,...rest} = req.body.data
    const course = await Course.updateOne({courseID:courseID},rest);
    if(!course){
      return res.status(404).send("Not Found");
     }
      res.status(200).send(course)

   }catch(err){
    res.status(400).send("Error");
    console.log(err);
   }
}
module.exports = {GetAllCourse,CreateCourse,CreateLesson,GetLesson,Revision,ListCourse,GetCourse,UpdateCourse};