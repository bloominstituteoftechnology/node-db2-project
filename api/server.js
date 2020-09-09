//* phase 1: import express and set up the server *// 
const express = require('express'); 
const server = express (); 

//? Q: This [const db] pulls in the connection to the database? 
const db = require('../data/db-config'); 

//* router imports *// 
const carsRouter = require('../cars/carsRouter'); 

//* use router commands *// 
server.use('/api/cars', carsRouter); 

//* opt-in commands *// 
server.use(express.json()); 

server.get('/', (req, res) => {
    res.send({ message: "This server is bumping yo!" }); 
}); 

//* export the server *// 
module.exports = server; 