var express = require('express');
var router = express.Router();
const {ListWords,FindWordsByLesson} = require("../controllers/WordController");

router.get("/list-words",ListWords);
router.post("/find-words-lesson",FindWordsByLesson);

module.exports = router;