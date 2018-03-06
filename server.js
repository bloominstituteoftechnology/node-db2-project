const express = require('express');
const bodyParser = require('body-parser');

const zooRouter = require('./routes/zoos');
const bearRouter = require('./routes/bears');

const server = express();

// endpoints here
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running...' });
});

server.use(bodyParser.json());
server.use('/zoos', zooRouter);
server.use('/bears', bearRouter);

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
