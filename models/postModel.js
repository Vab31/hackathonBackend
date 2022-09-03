const mongoose = require("mongoose");

const postSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter post name"],
        trim:true
    },
    content:{
        type:String,
        required:[true,"Please enter Post content"]
        
    },
   
    readingTime:{
        type:Number,
        required:[true,"Please enter Product cooking Time"],
        maxLength:[5,"Please cannot exceed 3 characters"]
    },
    isActive:{
        type:Boolean,
        default:true
    },

  
    image:
        {
            publicId:{
                type:String,
                // required:true
                default:""
            },
            url:{
                type:String,
                // required:true
                default:""
            }
        }
    ,

    tags:[{
        type:String,
        required:[true,"Please enter atleast 1 category"],
    }
    ],


    likes:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            }
        }
    ],
   

    author:   {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
},
{ timestamps: true }
)

module.exports=mongoose.model("Post",postSchema)