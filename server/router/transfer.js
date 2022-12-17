const express = require('express');
var router = express.Router();
var path = require("path");
const {verifyToken, verifyAdmin}  = require("../utils/verifyToken");
const {UploadAvatar, UploadImageFlashCard} = require("../controllers/UploadController");
var multer  = require('multer');
var upload = multer({
	dest: path.join(__dirname,'data')
});

router.post("/upload-avatar",verifyToken,upload.single('avatar'),UploadAvatar);
router.post("/upload-iflashcard",verifyToken,upload.single('img'),UploadImageFlashCard)


module.exports = router;