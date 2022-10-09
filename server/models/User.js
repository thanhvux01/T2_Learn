const mongoose = require('mongoose')
const { Schema } = mongoose;


const UserSchema = new Schema({
    username: {type:String,required:true,unique:true,maxLength:20},
    fullname: {type : String,required: true,maxLength:20},
    password: {type : String,minLength:8},
    birthday: {type: String, default: Date.now},
    email: {type : String,required: true,unique:true},
    isAdmin:{type:Boolean,default:false},
    createAt:{type:Date,default: Date.now},
    updateAt:{type:Date,default: Date.now},
}) 


module.exports = mongoose.model("User",UserSchema);
