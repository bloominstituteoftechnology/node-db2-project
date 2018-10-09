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
  .insert(newZoo)
  .then(zooId => {
      const { id } = zooId;
      console.log("id", typeof(id));
      zoos
      .get( id )
      .then(zoo => {
          console.log("zoo", zoo);
          if(!zoo) {
              return res
              .status(422)
              .send({ Error: `ID ${id} duplicated`});
          }
      res.status(201).json(zoo);
      });
  })
  .catch(err => console.log(err))
});

server.get('/api/zoos', (req, res) => {
  zoos
  .get()
  .then(zoos => {
      console.log(`\n** zoos **`, zoos);
  res
  .json(zoos)
  })
  .catch(err => res.send(err))
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
