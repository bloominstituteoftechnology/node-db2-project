const express = require("express");
const Cars=require('./cars-model')
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const data = await Cars.get()
        res.json(data)
    } catch(error){
        res.status(400).json({message:`${error}`})
    }
})
module.exports=router;
