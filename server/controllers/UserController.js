const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const GetUser= async (req,res) => {

    try{
        const user = await User.find({_id:req.user.id})     
       if(!user)
       {
        res.status(400).send("cannot find user")
       }
       const [{username,email,birthday,password}]  = user;
       res.send({username,email,birthday});
    }
    catch(err){


    }

}


const Register = async (req,res) => {
 try{
  const salt = bcrypt.genSaltSync(10);
 const {username,fullname,email,password,birthday} = req.body;
 const hash = bcrypt.hashSync(password,salt);
 const user = new User({
  username,
  fullname,
  email,
  password:hash,
  birthday,
 }
 );
 await user.save();
 }
 catch(err){
  console.log(err);
 }
 
}

const Login = async (req,res) => {
  try{
    console.log(req.body)
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
      const {_id,password,username,...otherdetail} = user;
      const token = jwt.sign({id:_id},process.env.SECRET_KEY);
      res.cookie("access_ticket",token,{httpOnly:true}).status(200).json({...otherdetail});
  }catch(err){
    console.log(err);
    res.status(400).json(err);
  }
}

module.exports = {GetUser,Register,Login};