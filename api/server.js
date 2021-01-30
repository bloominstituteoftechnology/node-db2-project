const express=require('express');
const helmet = require('helmet');
const carsRouter = require('./cars-router');

const server= express();
server.use(express.json());
server.use(helmet());

server.get('/',(req,res)=>{
    res.send("Welcome to cars api!")
})

server.use('/cars',carsRouter);

server.use((error,req,res,next)=>{
    error.statusCode = error.statusCode ? error.statusCode : 500
    res.status(error.statusCode).json(error.message)
})

module.exports=server;
