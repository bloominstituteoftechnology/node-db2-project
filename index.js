const express = require('express');
const helmet = require('helmet');
const knex = require('knex')
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const morgan = require('morgan');


const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('combined'));

// endpoints here
server.post('/api/zoos', async (req, res) => {
  const zoo = req.body;
  if(zoo.name) {
    try {
      const response = await db.insert(zoo).into('zoos');
      res.status(201).json(response)

    } catch(err) {
      res.status(501).json({ message: 'cannot save name to server'});
    }
  } else {
    res.status(404).json({ error: 'must provide a name'});
  }
})

server.get('/api/zoos', async (req, res) => {
  try {
    const response = await db('zoos');
    res.status(201).json(response);
  } catch(err) {
    res.status(501).json({ message: 'cannot retrieve the list of zoos' });
  }
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
