const express = require('express');
server = express();

//db
const db = require("../data/dbConfig.js");

//middlewares
const cors = require('cors');
server.use(express.json(), cors());

//Initial Server Request
//GET
server.get('/api/vehicles', async (req, res, next)=>{
    try{
        const allCars = await db.select('*').from('car-dealer');

        res.json(allCars);

    } catch (err) {
        next(err);
    }
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
        .into('car-dealer')

        res.json({ message: `Youre ${newVehicle.Make} has been added to the database`})

    } catch (err) {
        next(err);
    }
})




module.exports = server;
