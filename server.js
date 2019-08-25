const express = require('express');
const carRouter = require('./api/carsRouter');

const server = express();
const port = 5000;

server.use(express.json());
server.use('/api/cars' , carRouter);

server.get('/' , (req,res) =>{
    res.status(200).send('<h1> Car Dealer  <h1>');
})

server.listen( port , (req,res) => {
    console.log(`Server is listening on port ${port}`);
})

module.exports = server;