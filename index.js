const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  res.send("It's alive!");
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

server.get('/api/zoos/:id', async (req, res) => {
  try {
  const {id} = req.params;

  const zoo = await db('zoos').where({id}).first();
    if(zoo){
      res.status(200).json(zoo);
    } else {
      res.status(404).json({error: "Requested zoo could not be found."})
    }
  } catch (err) {
    res.status(500).json(err);
  }
  
})

server.post('/api/zoos', (req, res) => {
  const course = req.body;

  db.insert(course)
  .into('zoos')
  .then(ids => {
    res.status(201).json(ids[0]);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })

})

server.put('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  db('zoos')
  .where({id})
  .update(changes)
  .then(count => {
    if(!count || count < 1){
      //error
      res.status(404).json()
    } else {
      res.status(200).json(count);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

server.delete('/api/zoos/:id', (req, res) => {
  const {id} = req.params;

  db('zoos')
  .where({id})
  .del()
  .then(count => {
    if(!count || count < 1){
      //error
      res.status(404).json()
    } else {
      res.status(200).json(count);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})


const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
