const mongoose = require('mongoose');
const { Schema } = mongoose;
const ListLessonSchema = new Schema({
      name:{type:String,required:true},
      lessonID:{type:String,unique:true},
      _id:false,
  }) 
const CourseSchema = new Schema({
      courseID: {type : String,required:true,unique:true},
      name: {type : String,required:true},
      description: {type : String},
      image: {type : String},
      lessons: [ListLessonSchema],
      createdAt : {type: Date, default: Date.now},
      updateAt: {type: Date,default: Date.now},
      price:{type:Number,default:0},
});


module.exports = mongoose.model('Courses',CourseSchema);
