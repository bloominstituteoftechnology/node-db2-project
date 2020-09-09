//* SETUP: import express and set up the server *// 
const express = require('express'); 
const server = express (); 
const cors = require('cors'); 
const helmet = require('helmet'); 

//? Q: This [const db] pulls in the connection to the database? 
const db = require('../data/db-config'); 

//* router imports *// 
const carsRouter = require('../cars/carsRouter'); 


//* opt-in commands/middleware *// 
//! USE THESE THINGS BEFORE ROUTER AND SERVER USES !// OTHERWISE: SQL LITE MISUSE ERROR #21
server.use(express.json()); 
server.use(cors()); 
server.use(helmet()); 

//* use router commands *// 
server.use('/api/cars', carsRouter); 

server.get('/', (req, res) => {
    res.send({ message: "This server is bumping yo!" }); 
}); 

//* export the server *// 
module.exports = server; 