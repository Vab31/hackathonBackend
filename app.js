const express = require("express");
const app=express();
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload")
const cors=require("cors")



if(process.env.NODE_ENV !== "PRODUCTION"){
    const dotenv=require("dotenv");
dotenv.config({path:"./config.env"})
}

app.use(
    cors(
        {
 
        origin:[process.env.FRONTEND_HOST],
        credentials:true,
        
    }
    )
);




const errorMiddleware=require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
app.use(fileUpload());

// routes import
const testRoute=require("./routes/testRoute");
const user = require("./routes/userRoute");


app.use("/api/v1",testRoute);
app.use("/api/v1",user);




app.use(errorMiddleware);

module.exports=app
