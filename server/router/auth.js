var express = require('express')
var router = express.Router()
const {verifyToken,verfi, verifyAdmin} = require('../utils/verifyToken')
const {GetUser, Register, Login,UpdateStatis} = require('../controllers/UserController');
router.get("/find",verifyToken,GetUser);
router.post("/register",Register);
router.post("/login",Login);
router.post("/update-statis",verifyToken,UpdateStatis);
router.get("/checkpoint",verifyToken,(req,res,next) => {
 res.json(req.user);
})
router.get("/check-admin",verifyAdmin,(req,res)=>{
    res.send(req.user);
})

module.exports = router;