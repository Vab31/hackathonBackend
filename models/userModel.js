const mongoose = require("mongoose");
const validator=require("validator");


const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,"please enter your name"],
        maxlength:[30,"name cannot exceed 30 characters"],
        minlength:[3,"name should be atleat 3 characters"]
    },

    email:{
        type: String,
        required:[true,"please enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
   
    googleSub:{
        type:String,
        default:""
    },
    avatar:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
 
    posts: [  {
        type:mongoose.Schema.ObjectId,
        ref:"Post",
   
    }],
    likes: [  {
        type:mongoose.Schema.ObjectId,
        ref:"User",
   
    }]

},
{ timestamps: true });

module.exports=mongoose.model("User",userSchema)