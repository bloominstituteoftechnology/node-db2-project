const express = require('express');
const carRouter = require('./api/carsRouter');
const salesRouter = require('./api/salesRouter');

const server = express();
const port = 5000;

server.use(express.json());
server.use('/api/cars' , carRouter);
server.use('/api/sales' , salesRouter);

server.get('/' , (req,res) =>{
    res.status(200).send('<h1>Hello from Express. Your Car Dealer is Here<h1>');
})

server.listen( port , (req,res) => {
    console.log(`Server is listening on port ${port}`);
})

module.exports = server;