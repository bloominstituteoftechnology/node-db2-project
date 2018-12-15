const express = require('express');
const helmet = require('helmet');
const zooRouter = require('./routers/zoo_router');
const bearRouter = require('./routers/bear_router');
const server = express();

server.use(express.json());
server.use(helmet());

const port = 3300;

// Test the server at '/'
server.get('/', (req, res) => {
  res.json({message: "Server up and running!!"})
});

server.use('/zoos', zooRouter);
server.use('/bears', bearRouter);

// Always at bottom!
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
