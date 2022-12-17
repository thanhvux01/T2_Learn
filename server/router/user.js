var express = require('express')
var router = express.Router()
const {verifyToken, verifyAdmin} = require('../utils/verifyToken');
const {GetDailyAnswer,CheckDaily,CheckDailyReward} =  require("../controllers/StatisController");
const {GetAllUser,GetUser,FindUserById,UpdateUser,UpdateUserByUser,RankingExp} = require('../controllers/UserController');


router.get("/getdaily",verifyToken,GetDailyAnswer);
router.post("/checkdaily",verifyToken,CheckDaily);
router.post("/checkdailyreward",verifyToken,CheckDailyReward);
router.get("/list-users",verifyAdmin,GetAllUser);
router.post("/find",verifyAdmin,FindUserById);
router.post("/update-user",verifyAdmin,UpdateUser);
router.post("/update-by-user",verifyToken,UpdateUserByUser);
router.get("/ranking-exp",verifyToken,RankingExp);







module.exports = router;