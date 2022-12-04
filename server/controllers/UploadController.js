const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const ReadFile = async (req,res) => {
          try{
            //    console.log(req.body);
            //    fs.writeFileSync(path.format({dir:__dirname,base:'text.txt'}),file);
               res.json({"file":req.file})
          }catch(err){
             console.log(err);
             res.status(500).send("Error");
          }
}   

module.exports = {ReadFile};


