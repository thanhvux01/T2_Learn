const mongoose = require('mongoose');
const { Schema } = mongoose;

/*const Vocalbulary =new Schema({
    image1: {type:String},
    image2: {type:String},
    image3: {type:String},
    Word:{type:String},
    Meaning:{type:String},
})*/
const LessonContent = new Schema({
    type:{type:String},
    content:{type:Object},
    _id:false,
})
const LessonSchema = new Schema({
    name: {type:String},
    id:{type:Number,unique:true},
    content:[LessonContent],

})

module.exports = mongoose.model('Lesson',LessonSchema);