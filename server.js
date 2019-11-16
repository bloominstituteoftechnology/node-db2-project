const express = require('express');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
   res.send(` 
   
   <h1>Hello.</h1>
   <p>This is a template.</p>
   
   `);
});


module.exports = server; 