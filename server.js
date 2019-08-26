const express= require('express');
const server= express();
const cars= require('./data/car-dealer.db3');
// server.use(express.json());
// server.use('/api/cars', cars);

module.exports= server;