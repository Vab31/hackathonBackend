
const express= require("express");
const { googleSignin, getMyProfile } = require("../controllers/userController");
const {isAuthenticatedUser}=require("../middleware/auth")
const router=express.Router();

router.route("/googleSignIn").post(googleSignin);
router.route("/me").get(isAuthenticatedUser,getMyProfile);
module.exports=router