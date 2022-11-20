const mongoose = require('mongoose');
const { Schema } = mongoose;

const Chapters = new Schema({
    title:{type:String},
    chapter:{type:Number},
    raw:{type:Array},
    translate:{type:Array},
    img:{type:String},
    _id:false,

})

const StorySchema = new Schema({
     title:{type:String},
     author:{type:String},
     dayRelease:{type:Date,default:Date.now},
     content:[Chapters],
     difficult:{type:String},
     description:{type:String},
     price:{type:Number},
})


module.exports = mongoose.model("Story",StorySchema);