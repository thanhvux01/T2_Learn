var express = require('express');
var router = express.Router();
const {ListWords,FindWordsByLesson,CreateFlashcard,CheckFlashCard, GetCardsByUser,DeleteCardByUser,TranslateText,CreateSearchingCard} = require("../controllers/WordController");
const {verifyToken}  = require("../utils/verifyToken");

router.get("/list-words",ListWords);
router.post("/find-words-lesson",FindWordsByLesson);
router.post("/create-flashcard",verifyToken,CreateFlashcard);
router.post("/check-flashcard",verifyToken,CheckFlashCard);
router.post("/get-cards",verifyToken,GetCardsByUser);
router.post("/delete-card",verifyToken,DeleteCardByUser);
router.post("/translate",verifyToken,TranslateText);
router.post("/create-flashcard-searching",verifyToken,CreateSearchingCard);





module.exports = router;