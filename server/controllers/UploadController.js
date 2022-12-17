const cloudinary = require('cloudinary').v2;
const User = require("../models/User");
const fs = require('fs');
const path = require('path');
const FlashCard = require('../models/FlashCard');
cloudinary.config({ 
  cloud_name: 'dicgj8bdg', 
  api_key: '415948786888745', 
  api_secret: 'Qwe5JvELIhra50yBW0fCjYJRPn8' 
 });

const HandlePath = (name,ext="jpeg") => {
  return path.format({dir:process.cwd()+"\\data\\image",base:`${name}.${ext.slice(6,)}`});

}
const UploadAvatar = async (req,res) => {
          try{
            console.log(req.file)
            const user = await User.findOne({_id:req.user.id});
            if(!user)
            return res.status(404).send("User not found");
            const imagePath = req.file.path;
            const {mimetype="image/jpeg",encoding,originalname="img"} = req.file;
            try{
            const image  = fs.readFileSync(imagePath);
                fs.writeFileSync(HandlePath(originalname,mimetype),image);
                fs.unlinkSync(imagePath);
                await cloudinary.uploader.upload(HandlePath(originalname,mimetype),{folder: "avatar",transformation: [{width: 500, height: 500}]} ,(error, result)=>{
                  user.image = result.url;
                });
                await user.save();      
               res.json({"file":req.file})
               }catch(fileError){
                    console.log(fileError);
               }
          }catch(err){
             console.log(err);
             res.status(500).send("Error");
          }
}   
const UploadImageFlashCard = async (req,res) =>{
  try{
    console.log(req.file)
    console.log(req.body);
    const card = await FlashCard.findOne({userID:req.user.id,word:req.body.word});
    if(!card)
    return res.status(404).send("Card not found");
    const imagePath = req.file.path;
    const {mimetype="image/jpeg",encoding,originalname="img"} = req.file;
    try{
    const image  = fs.readFileSync(imagePath);
        fs.writeFileSync(HandlePath(originalname,mimetype),image);
        fs.unlinkSync(imagePath);
        await cloudinary.uploader.upload(HandlePath(originalname,mimetype),{folder: "avatar",transformation: [{width: 500, height: 500}]} ,(error, result)=>{
          card.img = result.url;
          card.type = "bySearch";
        });
        await card.save();      
       res.json({"file":req.file})
       }catch(fileError){
            console.log(fileError);
       }
  }catch(err){
     console.log(err);
     res.status(500).send("Error");
  }
}
module.exports = {UploadAvatar,UploadImageFlashCard};


