const express = require('express');
const helmet = require('helmet');

const zoosRoutes = require('./zoos/zoosRoutes.js');

const server = express();

server.use(helmet());
server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
  res.send("It's Alive");
});

server.use('/api/zoos', zoosRoutes);

server.listen(9000, () => console.log('\nAPI running on 9k\n'));
