var express = require('express');
var router = express.Router();
const {ListWords,FindWordsByLesson,UpdateWord,FindWordsByCourse,CreateFlashcard,CheckFlashCard,UpdateCard ,GetCardsByUser,DeleteCardByUser,TranslateText,FindAWord,CreateSearchingCard} = require("../controllers/WordController");
const {verifyToken,verifyAdmin}  = require("../utils/verifyToken");

router.get("/list-words",verifyAdmin,ListWords);
router.post("/find-words-lesson",verifyToken,FindWordsByLesson);
router.post("/find-words-course",verifyToken,FindWordsByCourse);
router.post("/find",verifyAdmin,FindAWord);
router.post("/update",verifyAdmin,UpdateWord);
router.post("/create-flashcard",verifyToken,CreateFlashcard);
router.post("/check-flashcard",verifyToken,CheckFlashCard);
router.post("/get-cards",verifyToken,GetCardsByUser);
router.post("/delete-card",verifyToken,DeleteCardByUser);
router.post("/translate",verifyToken,TranslateText);
router.post("/create-flashcard-searching",verifyToken,CreateSearchingCard);
router.post("/update-card",verifyToken,UpdateCard);







module.exports = router;