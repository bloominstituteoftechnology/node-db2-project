const express= require('express');
const server= express();
const db= require('./data/dbConfig');
const cars= require('./cars/cars');
server.use(express.json());
server.use('/api/cars', cars); 

module.exports= server;