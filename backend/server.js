require("node:dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const app=require("./src/app");
const connectMongoDB=require("./src/db");
connectMongoDB();
app.listen(3000,()=>{
    console.log("server is running port 3000");
})