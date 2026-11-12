const mongoose=require("mongoose");
const MovieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    genre:{
        type:String,
        required:true,
        trim:true,
    },
    rating:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        required:true,
        trim:true,
    },
    watchOn:{
        type:Date
    }
});
const Movie=mongoose.model("Movie",MovieSchema);
module.exports=Movie;