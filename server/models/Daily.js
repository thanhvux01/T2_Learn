const mongoose = require('mongoose')
const { Schema } = mongoose;

const DailySchema = new Schema({
    userID:{type:String},
    date:{type:Date,default:Date.now,required: true},
    total:{type:Number,default:0},
    reward:{type:Boolean,default:false},
})

DailySchema.index({userID:1,date:1},{ unique: true });

module.exports = mongoose.model("daily",DailySchema);