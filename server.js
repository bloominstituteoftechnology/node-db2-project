const express = require('express');

const server = express();

const port = 5000;

server.get('/' , (req,res) =>{
    res.status(200).send('<h1>Hello from Express. Your Car Dealer is Here<h1>');
})

server.listen( port , (req,res) => {
    console.log(`Server is listening on port ${port}`);
})

module.exports = server;