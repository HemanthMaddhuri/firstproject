const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/MyDatabase",(error)=>{
if(!error){
    console.log("success connected");
}
else{
    console.log("error connecting to database");
}
});

const Course = require("./course.model");
const Users = require("./users.model");
const search =require("./search.model");