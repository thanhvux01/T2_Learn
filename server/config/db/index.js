const mongoose = require('mongoose');
const url = "mongodb+srv://thanhvu:acz1X7SD79C4yX5q@cluster0.96uuf.mongodb.net/T2_learn?retryWrites=true&w=majority";
async function connect() {
   try{
     
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connect database succesfully!!!")
   }
   catch(error){
    console.log(error);
   }

}

module.exports = { connect };