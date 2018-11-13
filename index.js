const express = require('express');
const helmet = require('helmet');
/*const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);*/

const bearRouter = require('./routers/bearRouter.js');
const zooRouter = require('./routers/zooRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zooRouter);
server.use('/api/bears', bearRouter);

// endpoints here


server.get('/', (req, res) => {
  res.json({ api: 'running' });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
