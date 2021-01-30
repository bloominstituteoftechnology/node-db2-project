const express = require('express');
server = express();


//db
const db = require("../data/dbConfig.js");
const dbDealer = require('../data/dbDealer');

//middlewares
const cors = require('cors');
const logger = require('morgan');
const salesRouter = require('./salesRouter');

server.use(express.json(), cors(), logger('short'));
server.use('/api/sales', salesRouter);
// ENDPOINTS


//GET all vehicles in db
server.get('/api/vehicles', async (req, res, next)=>{
    const vehicles = await dbDealer.get()
    if (vehicles) {
        res.status(200).json({vehicles: vehicles})
    }else{
        res.status(400).json({Err: 'Something went wrong'})
    }
});

//GET vehicle by id
server.get('/api/vehicles/:id', async (req, res)=>{
    const vehicle = await dbDealer.getByID(req.params.id)
    if (vehicle) {
        res.status(200).json(vehicle);

    }else{
        res.status(400).json({message: 'Something went wrong.'})
    }
})


//POST new vehicle
server.post('/api/add_vehicle', async (req, res, next) => {
    dbDealer.insert(req.body)
   .then( resolve =>{
       res.status(200).json({resolve: req.body})
   }).catch(next)
});

//DELETE or sold vehicle

server.delete('/api/rm_vehicle/:id', async (req, res, next) =>{
   

    await dbDealer.remove(req.params.id)
    .then( resolve=> {
        res.status(200).json({resolve: resolve})
    }).catch(next)
    

    
})




module.exports = server;
