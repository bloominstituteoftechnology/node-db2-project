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

server.get('/', (req, res) => {
  res.send("Heyo");
});


server.post('/api/zoos', (req, res) => {
  const name = req.body;
  // const newZoo = { name };
  console.log(name);
  zoos
  .insert(name).into("zoos")
  .then(zooId => {
      const { id } = zooId;
      res.status(201).json(zooId)
      })
      .catch(err => res.status(500).json(err))
  });
  
server.get('/api/zoos', (req, res) => {
  zoos('zoos')
  .then(zoos => {
    res
      .status(200)
      .json(zoos)
  })
    .catch(err => res.send(err))
});

server.get('/api/zoos/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const zoo = await
      zoos('zoos')
        .where({ id })
        .first()
          if(zoo) {
            res
            .status(200)
            .json(zoo)
          }
          else {
          res
          .status(404)
          .json({ message: `Nuthin' Found with ID ${id}!`})
          }
  } catch(err) {
      res
      .status(500)
      .json(err)
  }
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

    zoos('zoos')
    .where({ id })
    .update(changes)
    .then(count => { 
      if(!count || count < 1) {
        res
        .status(404)
        .json({message: `There is no record at ID ${id} to update. Please input a valid ID.`})
      } else {
        res
        .status(200)
        .json(count);
      }
  })
  .catch(err => res.status(500).json(err));
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

    zoos('zoos')
    .where({ id })
    .del()
    .then(count => { 
      if(!count || count < 1) {
        res
        .status(404)
        .json({message: `There is no record at ID ${id} to delete. Please input a valid ID.`})
      } else {
        res
        .status(200)
        .json(count);
      }
  })
  .catch(err => res.status(500).json(err));
  
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
