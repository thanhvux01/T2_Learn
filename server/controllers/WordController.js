const Word = require("../models/Word");


const ListWords = async (req,res) => {
    try{
    const word = await Word.find({});
    res.status(200).send(word);
    }
    catch(err){
        console.log(err);
    }
}
const FindWordsByLesson = async (req,res) => {
   try{
    
    const {id} = req.body;
    console.log(req.body);
    const words = await Word.find({"lessonID":id,});
    // words.forEach(word => {
    //     let {name,meaning,phonetic,partofspeech} = word;
    //     handlewords.push({name,meaning,phonetic,partofspeech})
    // })
    if(words.length > 0) {
    handlewords = words.map((word)=>{
        let currentObj = {
            "name":word["name"],
            "meaning":word["meaning"],
            "phonetic":word["phonetic"],
            "partofspeech":word["partofspeech"],
        }
        return  currentObj;       
    })
    res.status(200).send(handlewords) 
   }
   else
    res.status(404).send("Word Not Found");
   
   }
   catch(err){
    console.log(err);
   }
}


module.exports = {ListWords,FindWordsByLesson}