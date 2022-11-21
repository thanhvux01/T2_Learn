var express = require('express')
var router = express.Router()
const {verifyToken} = require('../utils/verifyToken');
const {GetDailyAnswer,CheckDaily,CheckDailyReward} =  require("../controllers/StatisController");

router.get("/getdaily",verifyToken,GetDailyAnswer);
router.post("/checkdaily",verifyToken,CheckDaily);
router.post("/checkdailyreward",verifyToken,CheckDailyReward);



module.exports = router;