const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors")


exports.testCotroller=catchAsyncErrors(async(req,res,next)=>{
    res.status(201).json({
        success:true,
    })
})