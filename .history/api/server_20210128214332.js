const express = require('express');
server = express();

//db
const db = require("../data/dbConfig.js");
const dbDealer = require('../data/dbDealer');

//middlewares
const cors = require('cors');
const { json } = require('express');
const logger = require('morgan')
server.use(express.json(), cors(), logger('short'));

// ENDPOINTS


//GET
server.get('/api/vehicles', async (req, res, next)=>{
    const vehicles = await dbDealer.get()
    if (vehicles) {
        res.status(200).json({vehicles: vehicles})
    }else{
        res.status(400).json({Err: 'Something went wrong'})
    }
});

server.get('/api/vehicles/:id', (req, res)=>{
    const vehicle = await dbDealer.getByID(req.params.id)
    if (vehicle) {
        res.status(200).json(vehicle);

    }else{
        res.status(400).json({message: 'Something went wrong.'})
    }
})


server.get('/api/test/:id', async (req, res)=>{



});

//POST new vehicle
server.post('/api/add_vehicle', async (req, res, next) => {
    try {
        const newVehicle = await (req.body);
        
        await db.insert({
            Make: `${newVehicle.Make}`,
            Model: `${newVehicle.Model}`,
            VIN: `${newVehicle.VIN}`,
            Mileage: `${newVehicle.Mileage}`,
            titleIsClean: newVehicle.titleIsClean
        })
        .into('car-dealer');

        res.json({ message: `Your ${newVehicle.Make} has been added to the database`})

    } catch (err) {
        next(err);
    }
});

//DELETE or sold vehicle

server.post('/api/rm_vehicle', async (req, res, next) =>{
   

    try {
        const inputVehicle = await (req.body)
        const dataBaseVehicle = await db
        .select(`id`,'Make', 'VIN').from('car-dealer')
        .where(`id`, `=`, inputVehicle.id);
        

        console.log(`Input Vehicle :` ,inputVehicle, `Database Vehicle:` , dataBaseVehicle[0])

        
        if (
            dataBaseVehicle[0].VIN === inputVehicle.VIN
            &&
            dataBaseVehicle[0].id === inputVehicle.id 
            &&
            dataBaseVehicle[0].Make === inputVehicle.Make
        ){
            await db('car-dealer')
            .where('id', dataBaseVehicle[0].id)
            .del();

            res.json({message: `Your ${dataBaseVehicle[0].Make} has been removed from the database.`})
        }else{
            res.json({message: `Double check your input` })
        }
       

    } catch (err) {
        next(err)
    }

    
})




module.exports = server;
