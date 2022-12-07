const mongoose = require('mongoose')
const { Schema } = mongoose;

const RateSchema = new Schema({
      correct:{type:Number,default:0},
      total:{type:Number,default:0},
      _id:false,
})
// const DateSchema = new Schema({
//     date:{type:Date,default:Date.now},
//     total:{type:Number,default:0},
//     _id:false,
// })
const OwnStorySchema = new Schema({
    storyID:{type:String}, //unique
    dayAcquired:{type:Date,defdault:Date.now},
    _id:false,
})
const UserSchema = new Schema({
    username: {type:String,required:true,unique:true,maxLength:20},
    fullname: {type : String,required: true,maxLength:20},
    nickname:{type:String,maxLength:20},
    password: {type : String,minLength:8},
    birthday: {type: String, default: Date.now},
    email: {type : String,required: true,unique:true},
    image:{type:String},
    isAdmin:{type:Boolean,default:false},
    exp:{type:Number,default:0},  
    coin:{type:Number,default:0},
    accuracy:RateSchema,
    createAt:{type:Date,default: Date.now},
    updateAt:{type:Date,default: Date.now},
    streak:{type:String,default:0},
    ownStory:[OwnStorySchema],
    
}) 


module.exports = mongoose.model("User",UserSchema);
