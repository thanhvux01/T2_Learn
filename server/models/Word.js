const mongoose = require("mongoose");
const {Schema} = mongoose;

const WordSchema = new Schema({
    name:{type:String,required:true,unique:true},
    meaning:{type:String,required:true},
    phonetic:{type:String},
    partofspeech:{type:String},
    courseID:{type:Array},
    lessonID:{type:Array},
})


module.exports = mongoose.model("Word",WordSchema);