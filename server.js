const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('./database/db');

const server = express();
server.use(cors());
server.use(bodyParser.json());

const port = process.env.PORT || 4300;

server.get(('/', () => {res.json({success: true})}));

server.post('/zoos', (req, res) => {
  const zoo = req.body;

  knex
  .insert(zoo).into('zoos')
  .then( (ids) => {
    res.status(201).json({ ids })
  })
  .catch( (error) => {
    res.status(422).json({message: error});
  });
});

server.get('/zoos', (req, res) => {
  const allZoos = knex('zoos')
  .then((allZoos) => {
    res.status(201).json(allZoos)
  })
  .catch((error) => {
    res.status(422).json({message: error});
  });
});

server.post('/bears', (req, res) => {
  const bear = req.body;

  knex
  .insert(bear).into('Bears')
  .then( (ids) => {
    res.status(201).json({ ids })
  })
  .catch( (error) => {
    res.status(422).json({message: error});
  });
});

server.get('/bears', (req, res) => {
  const allBears = knex('Bears')
  .then((allBears) => {
    res.status(201).json(allBears)
  })
  .catch((error) => {
    res.status(422).json({message: error});
  });
});

server.get('/zoos/:id', (req, res) => {
  const { id } = req.params;
  const zoo = knex('zoos')
  .where('id', id)
  .then((records) => {
    res.status(201).json(records)
  })
  .catch((error) => {
    res.status(422).json({message: error});
  });
});

server.listen(port, () => {console.log(`server listening to ${port}`)});