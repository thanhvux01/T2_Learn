const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {DateOfNowString,DateOfNow} = require("../utils/dateOfNow");
require("dotenv").config();
const defaultImage = "https://res.cloudinary.com/dicgj8bdg/image/upload/v1670485999/Cow_Avatar_low8os.png";

const GetUser= async (req,res) => {

    try{
        const user = await User.findOne({_id:req.user.id})     
       if(!user)
       {
        res.status(404).send("cannot find user")
       }
      //  console.log(user);
       const {username,email,birthday,password,exp,coin,streak,accuracy,fullname,image}  = user;
       res.status(200).send({username,email,birthday,exp,coin,streak,accuracy,fullname,image});
    }
    catch(err){
      res.status(400).send("ERROR");
      console.log(err);
  
    }

}
const GetUserByParam = async (req,res) => {
    try{
      const user = await User.findOne({_id:req.query.userID })
      if(!user){
       return res.status(404).send("cannot find user")
      }
      const {email,birthday,exp,coin,streak,accuracy,fullname,...rest}  = user;
      return res.status(200).send({fullname,email,birthday,exp,coin,streak,accuracy});
    }catch(err){
       res.status(400).send("ERROR")
      console.log(err);
    }
}
const FindUserById = async (req,res) => {
  try{
    console.log(req.body);
    const user = await User.findOne({_id:req.body.userID })
    if(!user){
     return res.status(404).send("cannot find user")
    }
    const {username,fullname,email,birthday,exp,coin,streak,accuracy,createAt,updateAt,_id,...rest}  = user;
    return res.status(200).send({username,fullname,email,birthday,exp,coin,streak,accuracy,createAt,updateAt,_id});
  }catch(err){
    res.status(400).send("ERROR")
    console.log(err);
  }
}

const Register = async (req,res) => {
 try{
  // console.log(req.body);
  const salt = bcrypt.genSaltSync(10);
 const {username,fullname,email,password,birthday} = req.body;
 const hash = bcrypt.hashSync(password,salt);
 const user = new User({
  username,
  fullname,
  image:defaultImage,
  email,
  coin:1000,
  password:hash,
  birthday,
  accuracy:{
    correct:0,
    total:0,
  },
 }
 );
 await user.save();
 res.status(200).send("Success");
 }
 catch(err){
  console.log(err);
 }
 
}
const Logout=(req,res)=>{
  try{
    res.clearCookie("access_ticket",{
      secure:true,
      sameSite:"none",
  }).status(200).json("User has been logout")
}catch(err){
  console.log(err);
}
}
const Login = async (req,res) => {
  try{
      const user = await User.findOne({username:req.body.username});
      if(!user) 
      { 
        return res.json({error:"User not found",status:"404"}) ;
      }
      const comparePassword = await bcrypt.compare(req.body.password,user.password)
      if(!comparePassword) 
      {
        return res.json({error:"Wrong password",status:"400"});
      }
      const {_id,password,username,isAdmin,...rest} = user._doc; 
      const token = jwt.sign({id:_id,isAdmin},process.env.SECRET_KEY);
      res.cookie("access_ticket",token,{httpOnly:true}).status(200).send({...rest});
  }catch(err){
    console.log(err);
    res.status(400).json(err);
  }
}
// const Login = async (req,res) => {
//   try{
//     const user = await User.find({});
//     res.send("Hello");
//   }catch(err){
//     console.log(err);
//   }
// }
const UpdateStatis = async (req,res) => {
  try{
      const id = req.user.id;
      const {exp,coin,correct,total} = req.body;     
      const user = await User.findOne({"_id":id});
      user.exp += parseInt(exp);
      user.coin +=  parseInt(coin);
      user.accuracy = {  
         "correct":user.accuracy["correct"]+parseInt(correct),
        "total":user.accuracy["total"]+parseInt(total),
      }
       // !exist && user.daily.push({"date":handledDate,"total":parseInt(total)});
      await user.save();
      res.status(200).send("Success");
  }catch(err){
      console.log(err);
      res.status(400).send("error");
         
  }

}
const GetAllUser = async (req,res) => {
  try{
    const user = await User.find({});
    const date = DateOfNowString();
    const handledUser = user.map((item)=>{
      const age = parseInt(date)-parseInt(item.birthday.slice(0,4));
      const userobj = {
          id:item._id,
          username:item.username,
          birthday:item.birthday,
          fullname:item.fullname,
          email:item.email,
          exp:item.exp,
          coin:item.coin,
          age,
          
      }
      return userobj
 
    })
    res.status(200).send(handledUser);
  }catch(err){
       res.status(400).send("ERROR");
       console.log(err);
  }
}
const UpdateUser = async (req,res) => {
      try{
         const{_id,...rest} = req.body;
         const user = await User.updateOne({_id:_id},{...rest,updateAt:DateOfNow()});
         if(!user){
          return res.status(404).send("Not found");
         }
         res.status(200).send("SUCCESS");
      }catch(err){
        res.status(200).send("ERROR");
        console.log(err);
      }
}
const UpdateUserByUser = async (req,res) => {
  try{
    const {id} = req.user;
    const{...rest} = req.body;
    const user = await User.find({_id:id});
    if(!user){
      return res.status(404).send("Not found");
     }
    await User.updateOne({_id:id},{...rest,updateAt:DateOfNow()});
    res.status(200).send("SUCCESS");
 }catch(err){
   res.status(200).send("ERROR");
   console.log(err);
 }
}
const RankingExp = async (req,res) => {
   try{
    const user = await User.find({},{password:0,isAdmin:0,createAt:0,updateAt:0,ownStory:0}).sort({exp:-1});
    res.status(200).send(user);

   }catch(err){
    console.log(err);
    res.status(500).send("Critical Error");
   }
}
module.exports = {GetUser,Register,Login,UpdateStatis,GetAllUser,GetUserByParam,FindUserById,UpdateUser,UpdateUserByUser,Logout,RankingExp};