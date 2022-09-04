const express= require("express");
const { createPost, updatePost, getAllPosts, getPostDetails, likePost } = require("../controllers/postController");

const {isAuthenticatedUser}=require("../middleware/auth")
const router=express.Router();

router.route("/post/new").post(isAuthenticatedUser,createPost);
router.route("/posts").get(getAllPosts);
router.route("/post/:postId").put(isAuthenticatedUser,updatePost).get(getPostDetails);
router.route("/post/:postId/likePost").put(isAuthenticatedUser,likePost);
// router.route("/post/:postId/update").get(isAuthenticatedUser,updatePost);
module.exports=router