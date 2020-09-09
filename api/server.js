//* phase 1: import express and set up the server *// 
const express = require('express'); 
const server = express (); 

//* opt in to use JSON *// 
server.use(express.json()); 

server.get('/', (req, res) => {
    res.send({ message: "This server is bumping yo!" }); 
}); 

//* export the server *// 
module.exports = server; 