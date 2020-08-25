 const express = require('express')
 const knex = require("knex")
 const db = require("../data/config")
 const router = express.Router()

 router.get("/cars", async (req,res,next)=>{
     try{
        const cars = await db.select("*").from("cars")
        res.json(cars)
      
     }catch(err){
next(err)
     }
 })

 router.get("/cars/:id", async (req,res,next)=>{
     try{
         const{id}= req.params
         const car = await db("cars").where({id}).first()
        res.status(200).json(car)
     }catch(err){
         next(err)
     }
 })

 router.post("/cars" ,async (req,res,next)=>{
     try{
        const [id] = await db("cars").insert({Vin:req.body.Vin,Make:req.body.Make,Model:req.body.Model,Mileage:req.body.Mileage })
        const newcar = await db("cars").where({id}).first()
        res.json(newcar)
     }catch(err){
         next(err)
     }
 })

 router.put("/cars/:id",async (req,res)=>{
     try{
         const {id}= req.params
         const updatedCar = await db("cars").where({id}).update(req.body)
         res.json(updatedCar)

     }catch(err){
         next(err)
     }
 })

 router.delete("/cars/:id", async (req,res)=>{
     const {id}= req.params
    const car = await db("cars").where({id}).del()
    res.json(car)
 })

 module.exports = router