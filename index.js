console.log("Howdy from index.js!!");

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');

const server = express();

server.use(express.json());
server.use(logger('combined'));
server.use(cors());
server.use(helmet());

// endpoints here
const zooRoutes = reuire('./zoos/zooRoutes.js')

server.use('/zoos', zooRoutes);

//index  middleware
const timeStamp = (req, res, next) => {
  console.log(`${Date.now()} ${req.method} made to ${req.url}`)
  next();
};

//server testing message
server.get('/', (req, res) => {
  res.send('Good Morning, your server is working just fine.');
});

const port = 3300;
server.listen(port, () => console.log(`API flapping like a dead fish on port http://localhost:${port}`));
