const express = require("express");
const { testCotroller } = require("../controllers/testController");

const router=express.Router();

router.route("/test").get(testCotroller);

module.exports=router