const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

const zoosRoutes = require('./routes/zooRoutes.js');

// endpoints here
// sanity check endpoint
server.get('/', (req, res)=>{
  res.send("It's Alive");
});

server.use('/api/zoos', zoosRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=*= ZOO PROJECT ROLLING ON PORT http://localhost:${port} =*=\n`);
});
