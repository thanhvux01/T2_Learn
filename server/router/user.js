var express = require('express')
var router = express.Router()

const {SubmitForm,GetForm} = require('../controllers/UserController');


router.get("/get",GetForm);
router.post("/store",SubmitForm);

module.exports = router;