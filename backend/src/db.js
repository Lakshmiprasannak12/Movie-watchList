const mongoose=require("mongoose");
async function connectMongoDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connect successfully");
    }
    catch(error){
        console.log("MongoDB connection failed");
        console.log(error.message);
    }   
}
module.exports=connectMongoDB;
