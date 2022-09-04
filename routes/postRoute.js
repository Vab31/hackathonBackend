const express= require("express");
const { createPost, updatePost, getAllPosts } = require("../controllers/postController");

const {isAuthenticatedUser}=require("../middleware/auth")
const router=express.Router();

router.route("/post/new").post(isAuthenticatedUser,createPost);
router.route("/posts").get(getAllPosts);
router.route("/post/:postId/update").get(isAuthenticatedUser,updatePost);
module.exports=router