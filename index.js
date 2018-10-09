const helmet = require('helmet');
const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development)


const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if(!req.body.name){ res.status(409).json({ error: "Please include a name"}) }
  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

server.get('/api/zoos', (req, res) => {
  db.select().table('zoos')
    .then(table => {
      res.status(201).json(table)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  db.select().table('zoos')
    .where({id})
    .then(entry => {
      res.status(201).json(entry)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
  .where({ id }) //or .where('id', '=', id) //or .where({ id: id })
  .del()
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db('zoos')
    .where('id', '=', id) //or .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

// ******************
// ****Bears*******
// ******************
server.post('/api/bears', (req, res) => {
  const bear = req.body;
  if(!req.body.name){ res.status(409).json({ error: "Please include a name"}) }
  db.insert(bear)
    .into('bears')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

server.get('/api/bears', (req, res) => {
  console.log('running bears')
  db.select().table('bears')
    .then(table => {
      res.status(201).json(table)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

server.get('/api/bears/:id', (req, res) => {
  const { id } = req.params
  db.select().table('bears')
    .where({id})
    .then(entry => {
      res.status(201).json(entry)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  db('bears')
  .where({ id }) //or .where('id', '=', id) //or .where({ id: id })
  .del()
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.put('/api/bears/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db('bears')
    .where('id', '=', id) //or .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})




const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
