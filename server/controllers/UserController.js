const User = require("../models/User")

const GetForm = (req,res) => {

    res.send("GET FORM HERE")

}


const SubmitForm = (req,res) => {

 res.json(req.body);
 const user = new User(req.body);
 user.save();


}


module.exports = {GetForm,SubmitForm};