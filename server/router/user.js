var express = require('express')
var router = express.Router()
const {verifyToken} = require('../utils/verifyToken')
const {GetUser, Register, Login} = require('../controllers/UserController');
router.get("/find",verifyToken,GetUser);
router.post("/register",Register);
router.post("/login",Login);
router.get("/checkpoint",verifyToken,(req,res,next) => {
 res.json(req.user);
})

module.exports = router;