const express = require('express');

const knex = require('knex');

const knexConfig = require('./knexfile');

const zoos = knex(knexConfig.development);

const cors = require('cors');

const helmet = require('helmet');

const logger = require('morgan');

// const zoos = require('./data/lambda.sqlite3');

const server = express();


////// ++++++++MIDDLEWARE +++++++//////////

server.use(
  express.json(),
  cors(),
  logger(":method :url :status :response-time ms"),
  helmet()
  );


////////////+++zoo Routes++++/////////////////////////////

server.post('/api/zoos', (req, res) => {
  const { name } = req.body;
  const newZoo = { name };
  console.log(newZoo);
  zoos
  .insert(newZoo).into("zoos")
  .then(zooId => {
      const { id } = zooId;
      res.status(201).json(zooId);
      })
      .catch(err => res.status(500).json(err))
  });
  


server.get('/api/zoos', (req, res) => {
  zoos("zoos")
  .then(zoos => {
  res
  .status(200)
  .json(zoos)
  })
  .catch(err => res.send(err))
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
