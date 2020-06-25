const express= require("express");
const mongoose= require("mongoose");

const search = mongoose.model("automatic");
const router =express.Router();

router.get('/suggestion', async(req,res,next)=> {
_Word: String
_Word=req.param("Word")
const result= await search.find({Word:{$regex: new RegExp('^' + _Word.toLowerCase(), 'i')}},{Word:1,_id:0})
res.status(200).json({result});
});

module.exports= router;