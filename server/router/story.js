var express = require('express');
var router = express.Router();
const {verifyToken}  = require("../utils/verifyToken");
const {CreateStory,Get, GetStories} = require("../controllers/StoryController");

router.get("/get-stories",verifyToken,GetStories);
router.post("/create-story",CreateStory);


module.exports = router;