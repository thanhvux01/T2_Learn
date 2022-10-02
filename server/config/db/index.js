const mongoose = require('mongoose');

async function connect() {
   try{
     
    await mongoose.connect('mongodb+srv://thanhvu:zenz123@cluster0.96uuf.mongodb.net/?retryWrites=true&w=majority',{
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