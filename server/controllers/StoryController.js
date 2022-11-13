const Story = require("../models/Story");

const GetStories = async (req,res) => {
    try{

    const story = await Story.find({});
    res.status(200).send(story);
    }catch(err){
        res.status(400).send("Error");
    }
}
const CreateStory = async (req,res) => {
    try{
console.log(req.body);     
const {title,author,content,difficult,description} = req.body;
const contentOBJ = JSON.parse(content);
const story = new Story({
    title,
    author,
    difficult,
    content:contentOBJ,
    description,
    })
await story.save();
res.status(200).send("Success");
    }catch(err){
        console.log(err);
        res.status(400).send("Error");
    }
}

module.exports = {CreateStory,GetStories};