const express = require('express');
var router = express.Router();
var path = require("path");
const {verifyToken, verifyAdmin}  = require("../utils/verifyToken");
const {ReadFile} = require("../controllers/UploadController");
var multer  = require('multer');
var upload = multer({
	dest: path.join(__dirname,'data')
});

router.post("/file", upload.single('name'),ReadFile);



module.exports = router;