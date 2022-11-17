const Story = require("../models/Story");
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const path = require('path');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
const GetStories = async (req,res) => {
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
        await writeFile(`data/${user}/audio/${text.replaceAll(' ','')}.mp3`, response.audioContent, 'binary');
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
module.exports = {CreateStory,GetStories,AudioDecode,GetAudio};