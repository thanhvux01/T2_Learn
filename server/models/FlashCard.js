const mongoose = require('mongoose');
const { Schema } = mongoose

const FlashCardSchema = new Schema({
    userID:{type:String},
    word:{type:String},
    type:{type:String},
    img:{type:String},
}) 
FlashCardSchema.index({userID:1,word:1},{ unique: true });


module.exports = mongoose.model("Flashcard", FlashCardSchema);
