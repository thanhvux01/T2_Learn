var express = require('express')
var router = express.Router()
const homeController = require('../controllers/HomeController')

router.get('/',homeController.index)
/*
router.get('/',(res,req)=> res.send("Data"))
*/

module.exports = router;