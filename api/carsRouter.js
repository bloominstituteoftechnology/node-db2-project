const express=require('express')
const router=express.Router()
const db=require('../data/dbConfig')

router.get('/', async (req,res,next)=>{
    try{
        const cars= await db
        .select("*")
        .from("CarDealerShip")
        res.json(cars)
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const car= await db
        .select("*")
        .from("CarDealerShip")
        .where("id",req.params.id)
        res.json(car)
    }catch(err){next(err)}
})

router.post('/', async (req,res,next)=>{
    try{
        const payload={
            CarMake: req.body.CarMake,
            CarModel: req.body.CarModel,
            CarYear: req.body.CarYear,
            CarMileage: req.body.CarMileage,
            Foreign: req.body.Foreign,
            Color: req.body.Color
        }
        const [id]=await db
        .insert(payload)
        .into("CarDealerShip")
        const cars=await db("CarDealerShip").first().where("id",id)
        res.status(201).json(cars)
    }catch(err){next(err)}
})

router.put('/:id', async (req,res,next)=>{
    try{
        const payload={
            CarMake: req.body.CarMake,
            CarModel: req.body.CarModel,
            CarYear: req.body.CarYear,
            CarMileage: req.body.CarMileage,
            Foreign: req.body.Foreign,
            Color: req.body.Color
        }
        await db("CarDealerShip").where("id",req.params.id).update(payload)
        const updatedCar= await db("CarDealerShip").where("id",req.params.id).first()
        res.json(updatedCar)
    }catch(err){next(err)}
})

router.delete('/:id', async (req,res,next)=>{
    try{
            await db("CarDealerShip").where("id",req.params.id).del()
            res.status(200).json({message:"The car has been removed from the inventory."})
    }catch(err){next(err)}
})

module.exports=router