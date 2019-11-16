const express = require('express');

const carsRouter = require('./cars/cars-router.js')

const server = express();

server.use(express.json());
server.use('/api/cars', carsRouter)

server.get("/", (req, res) => {
   res.send(` 
   
   <h1>CARS API</h1>
   <p>Designed by Jashele Tillman</p>
   
   `);
});


module.exports = server; 