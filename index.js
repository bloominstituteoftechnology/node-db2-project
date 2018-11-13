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
  res.json({ api: 'up' });
});

// get all zoos
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err));
});

// add a new zoo
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db('zoos')
    .insert(zoo)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Cannot post zoo" });
    });
});

//get zoo by id
server.get('/api/zoos/:id', (req, res) => {
  let { id } = req.params;
  // id = id - 1;
  db('zoos').where({id}).then(zoo => {
    if (zoo.id !== 0) {
      res.status(200).json(zoo)
    } else {
      res.status(404).json({ message: "The zoo with the specified id does not exist." });
    }
  }).catch(error => {
    res.status(500).json({ error: "Cant get zoo data." });
  });
});

// delete zoo by id
server.delete('/api/zoos/:zooid', (req, res) => {
  const { zooid } = req.params;

  db('zoos')
    .where({ id: zooid })
    .del()
    .then(count => {
      res.status(200).json({ count })
    })
    .catch(error => res.status(500).json(error));
})

server.put('/api/zoos/:zooid', (req, res) => {
  const changes = req.body;
  const { zooid } = req.params;

  db('zoos')
    .where({ id: zooid })
    .update(changes)
    .then(count => {
      res.status(200).json({ count })
    })
    .catch(error => res.status(500).json(error));
})

// Bears

// get all zoos
server.get('/api/bears', (req, res) => {
  db('bears')
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err));
});

// add a new bear
server.post('/api/bears', (req, res) => {
  const bear = req.body;

  db('bears')
    .insert(bear)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Cannot post zoo" });
    });
});

//get bear by id
server.get('/api/bears/:id', (req, res) => {
  let { id } = req.params;

  db('bears').where({id}).then(bear => {
    if (bear.id !== 0) {
      res.status(200).json(bear)
    } else {
      res.status(404).json({ message: "The bear with the specified id does not exist." });
    }
  }).catch(error => {
    res.status(500).json({ error: "Cant get bears data." });
  });
});

// delete bear by id
server.delete('/api/bears/:bearid', (req, res) => {
  const { bearid } = req.params;

  db('bears')
    .where({ id: bearid })
    .del()
    .then(count => {
      res.status(200).json({ count })
    })
    .catch(error => res.status(500).json(error));
})

server.put('/api/bears/:bearid', (req, res) => {
  const changes = req.body;
  const { bearid } = req.params;

  db('bears')
    .where({ id: bearid })
    .update(changes)
    .then(count => {
      res.status(200).json({ count })
    })
    .catch(error => res.status(500).json(error));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
