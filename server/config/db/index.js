const mongoose = require('mongoose');

async function connect() {
   try{
     
    await mongoose.connect('mongodb://localhost:27017/T2_learn',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connect database succesfully!!!")
   }
   catch(error){
    handleError(error);


   }

}

module.exports = { connect };