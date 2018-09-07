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

server.get('/api/zoos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db('zoos').where('id', id);
    res.status(201).json(response);
  } catch(err) {
    res.status(501).json({ message: "cannot retrieve zoo" });
  }
})

server.delete('/api/zoos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db('zoos').where('id', id).del();
    res.status(201).json(response);
  } catch(err) {
    res.status(501).json({ message: "cannot delete zoo" });
  }
})


server.put('/api/zoos/:id', async (req, res) => {
  const { id } = req.params;
  const zoo = req.body;
  if(zoo.name) {
    try {
      const response = await db('zoos').where('id','=', id).update(zoo);
      res.status(201).json(response);
    } catch (err) {
      res.status(501).json({ message: "cannot update zoo"});
    }
  } else {
    res.status(404).json({ message: "must enter a name"});
  }
})
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
