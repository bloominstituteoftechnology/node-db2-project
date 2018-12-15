const express = require('express');
const helmet = require('helmet');
const zooRouter = require('./routes/zooRoutes');
const bearRouter = require('./routes/bearRoutes');

const server = express();

server.use(express.json());
server.use(helmet());

//ENDPOINTS


server.use('/zoos', zooRouter);



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
