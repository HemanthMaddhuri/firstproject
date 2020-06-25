const connection = require("./model");
const express = require("express");
const application =express();
const path =require("path");
const expressHandlerbars= require("express-handlebars");
const bodyparser =require("body-parser");


const CourseContoller = require("./controllers/courses");
const SearchController =require("./controllers/search");
// const myMongo = require("./controllers/myMongo");
application.use(bodyparser.urlencoded({
    extended :true
}));

application.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

application.get("/",(req,res)=>{
    res.send('<h1>Hello World<h1>')
})
// application.use("/myMongo",myMongo)

application.use("/course",CourseContoller)
application.use("/search",SearchController)

application.listen("3000", ()=>{
    console.log("server started");
});
