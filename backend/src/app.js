const express=require("express");
const cors=require("cors");
const app=express();
const movieRoutes=require("./routes/movieRoutes");
app.use(cors());
app.use(express.json());
app.use("/movies",movieRoutes);
app.get("/",(req,res)=>{
    res.send("movie watching list is running");
});
module.exports=app;