const Word = require("../models/Word");
const Flashcard = require("../models/FlashCard");
const axios = require("axios");

const ListWords = async (req,res) => {
    try{
    const word = await Word.find({});
    res.status(200).send(word);
    }
    catch(err){
        res.status(400).send("Error");
        console.log(err);
    }
}
const FindAWord = async (req,res) => {
   try{
    //  console.log(req.body)
     const {wordID} = req.body;
     const word = await Word.findOne({name:wordID});
     if(!word){
        return res.status(404).send("word not found");
     }
     
     res.status(200).send(word);
   }catch(err){
    console.log(err);
    res.status(400).send("Error");
   }
}
const UpdateWord = async (req,res) => {
    try{
        const {name,...rest} = req.body;
        const word = await Word.findOne({name:name})    
        if(!word){
        
        return res.status(404).send("Word Not found");
        }
        await Word.updateOne({name:name},rest);
        res.status(200).send("Success");
    }catch(err){
        console.log(err);
        res.status(400).send("Error");     
    }
}
const FindWordsByLesson = async (req,res) => {
   try{
    
    const {id} = req.body;
 
    const words = await Word.find({"lessonID":id.toString()});
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
const FindWordsByCourse = async (req,res) => {
    try{
     
     const {id} = req.body;
  
     const words = await Word.find({"courseID":id.toString()});
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
const CreateFlashcard = async (req,res)  => {
    try{
    const {id} = req.user;
    const {word} = req.body;
    const check = await Flashcard.findOne({
        userID:id,
        word,
    });
    if(!check){
    const getDetail = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
   
    const translate =  await axios.get(`https://translation.googleapis.com/language/translate/v2?key=${process.env.API_KEY}&q=${word}&target=vi`);
    const meaning = translate.data["data"]["translations"][0].translatedText
    const phonetic = getDetail.data[0].phonetic;
    const partofspeech =  getDetail.data[0].meanings[0].partOfSpeech;
    const flashcard = new Flashcard({
        userID:id,
        word,
        type:"byCourse",
        phonetic,
        meaning,
        partofspeech,
     
    })
    await flashcard.save(); 
    res.status(201).send("Success");
    } 
    else{
        res.status(400).send("Duplicate flashcard");
    }  
    }
    catch(err){
        console.log(err);
    }
}
const CreateSearchingCard = async (req,res)  => {
    try{
    const {id} = req.user;
    console.log(req.body);
    const {img,data} = req.body;
    const {name,meaning,partofspeech,phonetic,color} = data;
    const  Word =  name.charAt(0).toUpperCase() + name.slice(1);
    const check = await Flashcard.findOne({
        userID:id,
        word:Word,
    });
    if(!check){
    const flashcard = new Flashcard({
        userID:id,
        word:Word,
        img,
        type:"bySearch",
        meaning,
        partofspeech,
        phonetic,
        color,
    })
    await flashcard.save(); 
    res.status(201).send("Success");
    } 
    else{
        check.img = img;
        check.color = color;
        await check.save();
        res.status(200).send("Success");
    }  
    }
    catch(err){
        console.log(err);
    }
}
const CheckFlashCard = async (req,res) => {
    try{
      
        const {id} = req.user;
        const {word} = req.body;
        const check = await Flashcard.findOne({
            userID:id,
            word,
        });
        if(!check){
        res.status(200).send("Available");
        } 
        else{
            res.status(200).send("Unavailable");
        }  
        }
        catch(err){
            console.log(err);
        }
}
const GetCardsByUser = async (req,res) => {
    try{
        const {id} = req.user;    
        const flashcards = await Flashcard.find({
            userID:id,
        }).select({"userID":0})
        if(flashcards){
        // const replaceArray =  flashcards.map((item)=>{
        //            return item["word"];
        //    })
        // const records = await Word.find().where('name').in(replaceArray).select({"name":1,"meaning":1,"phonetic":1,"partofspeech":1}).exec();
        res.status(200).send(flashcards);
        } 
        else{
            res.status(200).send("You don't have any card");
        }  
        }
        catch(err){
            console.log(err);
        }
}
const DeleteCardByUser = async(req,res) => {
    try{
        const {id} = req.user;
        const {word} = req.body;    
        const flashcards = await Flashcard.findOneAndDelete({"userID":id,word});
        if(flashcards) {
        res.status(200).send("Delete Success!")
        }
        else{
            res.status(404).send("Not Found")    
        }
    }   
    catch(err){
            console.log(err);
    }
}
 
const TranslateText = async (req,res) => {
    const options = {url: `https://translation.googleapis.com/language/translate/v2?key=${process.env.API_KEY}`,
              method : 'GET',
            params:{
                q:"Hello",
                target:"vi",
            },}
    try{  
        const {text} = req.body;
        options.params.q = text;
        const translate = await axios.request(options);
        // console.log(translate.data);
        if(translate) {
        res.status(200).send(translate.data["data"]["translations"]);
        }
        else{
            res.status(404).send("Not Found")    
        }
    }   
    catch(err){
            console.log(err);
    }
}
const UpdateCard = async (req,res) => {
    try{
        const {id} = req.user;
        const {word,note,image} = req.body;
        const card = await Flashcard.findOne({userID:id,word:word});
        if(!card){
            return res.status(404).send("Card not found");
        }
        if(image)
        card.type = "bySearch";
        card.note = note;
        await card.save();
        res.status(200).send("Success")
    }catch(err){
        console.log(err);
        res.status(500).send("Critical Error")
    }
}

module.exports = {ListWords,FindWordsByLesson,CreateFlashcard,CheckFlashCard,GetCardsByUser,DeleteCardByUser,TranslateText,CreateSearchingCard,FindAWord,UpdateWord,
FindWordsByCourse,UpdateCard}