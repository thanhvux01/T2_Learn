var express = require('express')
var router = express.Router()
const {verifyToken} = require('../utils/verifyToken');
const {GetDailyAnswer,CheckDaily} =  require("../controllers/StatisController");

router.get("/getdaily",verifyToken,GetDailyAnswer);
router.post("/checkdaily",verifyToken,CheckDaily);


module.exports = router;