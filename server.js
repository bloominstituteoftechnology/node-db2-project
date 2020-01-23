const express = require('express');
const server = express();
const carModels = require('./carModel')



server.use(express.json());
server.use('/api/pain', carModels)



server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Database API</h>
    <p>Welcome to the Lambda Database API</p>
  `);
});


module.exports = server;