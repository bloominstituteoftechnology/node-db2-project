const express = require('express');
const helmet = require('helmet');
const port = 7100;
const zoosRoutes = require('./zoos/zoosRoutes');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`It's Alive!`);
});

server.use('/api/zoos', zoosRoutes);

server.listen({ port }, () => console.log(`~- API running on port -~`));