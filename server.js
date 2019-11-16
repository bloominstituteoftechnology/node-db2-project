const express = require('express');

const carRouter = require('./cars/cars-router.js')

const server = express();

server.use(express.json());
server.use('/api/accounts', carRouter)

server.get("/", (req, res) => {
   res.send(` 
   
   <h1>CARS API</h1>
   <p>Designed by Jashele Tillman</p>
   
   `);
});


module.exports = server; 