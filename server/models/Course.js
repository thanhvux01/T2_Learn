const mongoose = require('mongoose');
const { Schema } = mongoose;
const ExcerciseSchema = new Schema({
      name:{type:String,required:true},
      _id:false,
  }) 
const CourseSchema = new Schema({
      name: {type : String,required:true},
      description: {type : String},
      image: {type : String},
      excercise: [ExcerciseSchema],
      createdAt : {type: Date, default: Date.now},
      updateAt: {type: Date,default: Date.now},
});


module.exports = mongoose.model('Courses',CourseSchema);
