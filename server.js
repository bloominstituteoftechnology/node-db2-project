const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const CarRouter = require('./cars/car-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/cars', CarRouter);
server.get("/", (req,res)=>{
    res.json(`Api working`)
})

module.exports = server;

