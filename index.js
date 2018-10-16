const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// testing server
server.get('/', (req, res) => {
  res.json("Yahoo was good for Japanese Market place")
  
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on PORT ${port} ===\n`);
});
