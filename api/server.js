const express = require("express");
const CarsRouter = require("../api/cars/cars-router")  
const server = express();

server.use(express.json());
server.use('/api/cars',CarsRouter);

server.get('/',(req,res)=>{
    res.status(200).json(`hello bubblegum`)
})

module.exports = server;