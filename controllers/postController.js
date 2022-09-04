const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const postSchema=require("../models/postModel")
const userSchema=require("../models/userModel")
const cloudinary=require("cloudinary")
const ApiFeatures=require("../utils/apiFeatures")


// create Post --admin
exports.createPost=catchAsyncErrors(async(req,res,next)=>{
  
  let tags=[]
  
  // if(req.body.image){
    
    
  //   const myCloud=await cloudinary.v2.uploader.upload(req.body.image,{folder:"post_hackathon",width:150,crop:"scale"})
   
  //   req.body.image={
  //     publicId:myCloud.public_id,
      
  //     url:myCloud.secure_url,
  //   }
  // }
  if(req.body.tags){
    tags=req.body.tags
    req.body.tags=tags}
    req.body.author=req.user._id;
      const post = await postSchema.create(req.body);
  

      const user=await userSchema.findById(req.user._id);
  
      if(!user){
        return next(new ErrorHandler("user not found", 404));
      }
  
      const userNew=await userSchema.findByIdAndUpdate(req.user._id,{$push:{posts:`${post._id}`}});

  
      res.status(201).json({
          success:true,
          post
      })
  });



  // update post --admin

exports.updatePost=catchAsyncErrors(async(req,res,next)=>{
    let post = await postSchema.findById(req.params.id);
  
    if(!post){
      return next(new ErrorHandler("Product not found", 404));
    }

  post = await postSchema.findByIdAndUpdate(req.params.id,req.body,{
    new:true,runValidators:true,useFindAndModify:false
  });

  res.status(200).json({
    success:true,
    post
  })
});

// get all posts
exports.getAllPosts=catchAsyncErrors(async(req,res,next)=>{
 
  
  let apiFeature
  
     
    apiFeature=new ApiFeatures(postSchema.find(),req.query).search().filter();
  
const posts=await apiFeature.query;

      res.status(201).json({
        success:true,
        posts,
        
    })
    })
  