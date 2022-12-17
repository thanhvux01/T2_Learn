const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/T2_learn";
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