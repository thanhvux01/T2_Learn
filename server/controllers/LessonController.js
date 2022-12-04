const Lesson = require("../models/Lesson");


const ListLesson = async (req,res) => {

    try{
     const lesson = await Lesson.find({});
     const handleLesson = lesson.map((item)=>{
     let lessonObj = {name:"",number:0,id:"",description:""};                           
                 lessonObj.name = item["name"];   
                 lessonObj.id = item["id"];
                 lessonObj.description = item["description"];
                 lessonObj.numberOfQuestion = item["content"].length;         
                 return lessonObj;                   
     })
     res.status(200).send(handleLesson);
    }catch(err){
        console.log(err);
        res.status(400).send("Error");
    }


}
const GetALesson = async(req,res) => {
    try{
        const {lessonID} = req.body;
        const lesson = await Lesson.findOne({id:lessonID});
        if(!lesson)
        return res.status(404).send("Lesson Not Found");
        res.status(200).send(lesson);

    }catch(err){
        res.status(400).send("Error");
        console.log(err);

    }
}

const UpdateLesson = async(req,res) => {
    try{ 
        const {lessonID,...rest} = req.body;
        const lesson = await Lesson.findOne({id:lessonID});
        if(!lesson)
        return res.status(404).send("Lesson Not Found");

        await Lesson.updateOne({id:lessonID},rest);
        res.status(200).send("Success");
    }catch(err){
        console.log(err);
        res.status(400).send("Error");
    }
}
const AddQuestion = async (req,res) => {
    try{ 
         const {lessonID,word1,word2,word3,result,meaning,type} = req.body;
         const LessonContent = {
            type,
            content:{ word1, word2, word3,result, meaning,}
         }
         const lesson = await Lesson.findOne({id:lessonID});
         if(!lesson)
         return res.status(404).send("Lesson Not Found");
         lesson["content"].push(LessonContent);
         await lesson.save();
         res.status(200).send("Success");
    }catch(err){
        console.log(err);
        res.status(400).send("Error");
    }
}
module.exports = {ListLesson,UpdateLesson,GetALesson,AddQuestion};