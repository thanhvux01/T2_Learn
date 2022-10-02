const mongoose = require('mongoose')
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {type : String},
    password: {type : String},
    birthday: {type: String, default: Date.now},
    email: {type : String},
}) 


module.exports = mongoose.model("User",UserSchema);