const catchAsyncErrors=require("../middleware/catchAsyncErrors")
const jwt_decode=require("jwt-decode")
const sendToken = require("../utils/jwtToken");
const userSchema=require("../models/userModel");

exports.googleSignin=catchAsyncErrors(async(req,res,next)=>{
    
    const {tokenId}=req.body;
    const userObj=await jwt_decode(tokenId);
    // console.log(userObj)


const email_verified=userObj.email_verified;
const name=userObj.name;
const email=userObj.email;

const googleSub=userObj.sub;
const avatar=userObj.picture;


if(email_verified){
    const user =await userSchema.findOne({email});
               if(user){
                sendToken(user,201,res);
            }else{
                // let password=email+process.env.JWT_SIGNIN_KEY;
                let newUser=await userSchema.create({name,email,googleSub,avatar});
                // let newUser=await userSchema.create({name,password,email,googleSub,avatar});

                sendToken(newUser,201,res);
            }
}

//   })
})


// get my user profile
exports.getMyProfile=catchAsyncErrors(async(req,res,next)=>{
   
    const testUser=await userSchema.findById(req.user._id);
    const admin=testUser.admin
    const user=req.user;
 
    res.status(200).json({
        success:true,
        user,
        admin
    })
});



// logout user
exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        secure:true,
        sameSite:'none',
        httpOnly:true,
    });

    res.status(200).json({
        success:true,  
        
        message:"Logged Out"
    })
})