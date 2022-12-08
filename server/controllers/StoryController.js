const Story = require("../models/Story");
const User = require("../models/User");
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const path = require('path');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
const DateOfNow = () => {
    const date = new Date();
    const currentDate = date.getUTCDate();
    const currentMonth = date.getUTCMonth() + 1;
    const currentYear = date.getUTCFullYear();
    return new Date(currentYear + "-" + currentMonth + "-" + currentDate);
}
const GetStories = async (req,res) => {
    try{
    const id = req.user.id;
    const story = await Story.find({});
    const user = await User.findOne({"_id":id})
    res.status(200).send(story);
    }catch(err){
        res.status(400).send("Error");
    }
}
const GetOwnedStories = async (req,res)  => {
    try{

        const story = await Story.find({});
        res.status(200).send(story);
        }catch(err){
            res.status(400).send("Error");
        }
}
const CreateStory = async (req,res) => {
    try{
console.log(req.body);     
const {title,author,content,difficult,description} = req.body;
const contentOBJ = JSON.parse(content);
const story = new Story({
    title,
    author,
    difficult,
    content:contentOBJ,
    description,
    })
await story.save();
res.status(200).send("Success");
    }catch(err){
        console.log(err);
        res.status(400).send("Error");
    }
}
const AudioDecode = async (req,res) => {

    const request = {
        input: {text: "Hello"},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'en-US', ssmlGender: 'MALE'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
      };
    try{  
        
        const{text,user} = req.body;
        request.input["text"] = text;
        const [response] = await client.synthesizeSpeech(request);
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(`data/${user}/audio/${text.toString().replace(/ /g,"")}.mp3`, response.audioContent, 'binary');
        res.status(200).send("Success");
        console.log("Writed");
    }   
    catch(err){
        res.status(400).send("Error");
            console.log(err);
    }
}
const GetAudio = async (req,res) => {
    const options = {
        root: path.join(process.cwd(), 'data'),
        dotfiles: 'allow',
     } 
     try{
        const {user,file} = req.query
        res.sendFile(`${user}/audio/${file}.mp3`,options,function(err){
            if(err){
                console.log(err)
            }else{           
           console.log("Success");             
            }
        });
     }
     catch(err){
        console.log(err);
     }
}
const BuyStory = async(req,res) => {
    try{
       const {storyID} = req.body;
       const id = req.user.id;
       const user = await User.findOne({"_id":id});
       let acquired = false;
       user.ownStory.map((item)=>{
         if(item["storyID"] == storyID){
            acquired = true;
         }
       })
       !acquired && res.send("Not Owned");
       acquired && res.send("Owned");
    }catch(err){
          console.log(err);
    }
}
const ConfirmBuy = async (req,res) => {
    try{
       
        const {storyID} = req.body;
        console.log(storyID);
        const id = req.user.id;
        const dayAcquired = DateOfNow();
        const story = await Story.findOne({storyID});
        const user = await User.findOne({"_id":id});
        user.ownStory.push({
            storyID,
            dayAcquired,
        }) 
        user.coin = user.coin - story.price
        await user.save();
        res.status(200).send("Success");    
     }catch(err){
           console.log(err);
     }
 }

// const AudioDecode2 = async (req,res) => {

//     const request = {
//         input: {text: "I love you"},
//         // Select the language and SSML voice gender (optional)
//         voice: {languageCode: 'en-US', ssmlGender: 'MALE'},
//         // select the type of audio encoding
//         audioConfig: {audioEncoding: 'MP3'},
//       };
//      const options = {
//         root: path.join(process.cwd(), 'data'),
//         dotfiles: 'allow',
//      } 
//     try{  
        
//         const [response] = await client.synthesizeSpeech(request);
//         const writeFile = util.promisify(fs.writeFile);
//         await writeFile('data/Thanh11/audio/reading.mp3', response.audioContent, 'binary');
//         res.sendFile("Thanh11/audio/reading.mp3",options,function(err){
//             if(err){
//                 console.log(err)
//             }else{           
//            console.log("Success");             
//             }
//         });
//     }   
//     catch(err){
//             console.log(err);
//     }
// }
module.exports = {CreateStory,GetStories,AudioDecode,GetAudio,BuyStory,ConfirmBuy};