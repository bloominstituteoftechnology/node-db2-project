const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  if(zoo.name) {
    db('zoos').insert(zoo)
    .then((id) => {
      res.status(201).json(id)
    })
    .catch(err => {
      res.status(500).json({message: 'Error adding zoo'})
    })
  } else {
    res.status(400).json({message: 'Missing name!'})
  }
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    res.status(500).json({message: 'Error getting zoos'})
  })
});

server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params;

  db('zoos').where('id', id)
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    res.status(500).json({message: 'Error gettin that zoo'})
  })
});

server.delete('/api/zoos/:id', (req, res) => {
  const {id} = req.params;

  if(id) {
    db('zoos').where('id', id)
    .delete()
    .then(rows => {
      res.status(201).json(rows)
    })
    .catch(err => {
      res.status(500).json({message: 'Error deleting zoo'})
    })
  }
});

server.put('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  const zoo = req.body;

  if(id && zoo.name) {
    db('zoos').where('id', id)
    .update(zoo)
    .then(rowCount => {
      res.json(rowCount)
    })
    .catch(err => {
      res.status(500).json({message: 'Error updating zoo'})
    })
  } else {
    res.json({message: 'Missing name or ID'})
  }
})


//BEARS TABLE ENDPOINTS******

server.post('/api/bears', (req, res) => {
  const zoo = req.body;

  if(zoo.name) {
    db('bears').insert(zoo)
    .then((id) => {
      res.status(201).json(id)
    })
    .catch(err => {
      res.status(500).json({message: 'Error adding bear'})
    })
  } else {
    res.status(400).json({message: 'Missing name!'})
  }
});

server.get('/api/bears', (req, res) => {
  db('bears')
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    res.status(500).json({message: 'Error getting bears'})
  })
});

server.get('/api/bears/:id', (req, res) => {
  const {id} = req.params;

  db('bears').where('id', id)
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    res.status(500).json({message: 'Error gettin that bear'})
  })
});

server.delete('/api/bears/:id', (req, res) => {
  const {id} = req.params;

  if(id) {
    db('bears').where('id', id)
    .delete()
    .then(rows => {
      res.status(201).json(rows)
    })
    .catch(err => {
      res.status(500).json({message: 'Error deleting bear'})
    })
  }
});

server.put('/api/bears/:id', (req, res) => {
  const {id} = req.params;
  const zoo = req.body;

  if(id && zoo.name) {
    db('bears').where('id', id)
    .update(zoo)
    .then(rowCount => {
      res.json(rowCount)
    })
    .catch(err => {
      res.status(500).json({message: 'Error updating bear'})
    })
  } else {
    res.json({message: 'Missing name or ID'})
  }
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
