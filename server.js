const app=require("./app");
const connectDatabase=require("./config/database")
const cloudinary=require("cloudinary")


// handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unCaught Exception`);
    process.exit(1);

});



//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    const dotenv=require("dotenv");
dotenv.config({path:"./config.env"})
}

connectDatabase();

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
});

const server=app.listen(process.env.PORT || 4000,()=>{
        console.log(`Server is working on ${process.env.BACKEND_HOST}`)
    
})


process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`); 
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
})

