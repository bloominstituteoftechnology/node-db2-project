const express = require('express');
const bodyParser = require('body-parser');

const zooRouter = require('./zoos/zooRouter');
const bearRouter = require('./bears/bearRouter');

const server = express();

server.use(bodyParser.json());

// endpoints here

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' })
});

server.use('/zoos', zooRouter);
server.use('/bears', bearRouter);


const port = 3000;
server.listen(port, function () {
  console.log(`Server Listening on ${port}`);
});
