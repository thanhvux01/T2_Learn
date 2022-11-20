var express = require('express');
var router = express.Router();
const {verifyToken}  = require("../utils/verifyToken");
const {CreateStory,GetStories,AudioDecode,GetAudio,BuyStory,ConfirmBuy} = require("../controllers/StoryController");

router.get("/get-stories",verifyToken,GetStories);
router.post("/audio-decode",AudioDecode);
router.get("/audio-source",GetAudio);
router.post("/create-story",CreateStory);
router.post("/buy-story",verifyToken,BuyStory);
router.post("/confirm-buy",verifyToken,ConfirmBuy);





module.exports = router;