const express = require('express');
const helmet = require('helmet');





const ZooRoutes = require('./zoos/ZooRoutes');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  res.send('hello');
});


server.use('/api/zoos', ZooRoutes);



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
