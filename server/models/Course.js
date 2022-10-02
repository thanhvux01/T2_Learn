const mongoose = require('mongoose')
const { Schema } = mongoose;

const CourseSchema = new Schema({
      name: {type : String},
      description: {type : String},
      image: {type : String},
      createdAt : {type: Date, default: Date.now},
      updateAt: {type: Date,default: Date.now},
});


module.exports = mongoose.model('Courses',CourseSchema);
