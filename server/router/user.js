var express = require('express')
var router = express.Router()
const {verifyToken, verifyAdmin} = require('../utils/verifyToken');
const {GetDailyAnswer,CheckDaily,CheckDailyReward} =  require("../controllers/StatisController");
const {GetAllUser,GetUser,FindUserById,UpdateUser} = require('../controllers/UserController');


router.get("/getdaily",verifyToken,GetDailyAnswer);
router.post("/checkdaily",verifyToken,CheckDaily);
router.post("/checkdailyreward",verifyToken,CheckDailyReward);
router.get("/list-users",verifyAdmin,GetAllUser);
router.post("/find",verifyAdmin,FindUserById);
router.post("/update-user",verifyAdmin,UpdateUser);





module.exports = router;