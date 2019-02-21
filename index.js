// basic setup for server
const express = require('express'); // call in express
const server = express(); //
server.use(express.json()); //
const port = 8000; // create port for server to listen on
server.listen(port, function() { // server listens on port 8000
  console.log(`===Web API Listening on http://localhost:${port}===`); // notification via console of server activity
});

// endpoints 
server.post('/characters', (req, res) => { // create "characters" endpoint
  //to be filled
});

