const helmet = require('helmet');
const express = require('express');
// const knex = require('knex');
// const knexConfig = require('./knexfile.js');

const zoosDb = require('./data/zoosDb.js')
const bearsDb = require('./data/bearsDb.js')

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if(!req.body.name){ res.status(409).json({ error: "Please include a name"}) }
  zoosDb.insert(zoo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

server.get('/api/zoos', (req, res) => {
  zoosDb.find()
    .then(table => {
      res.status(201).json(table)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  zoosDb.findById(id)
    .then(entry => {
      res.status(201).json(entry)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  zoosDb.remove(id)
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
  zoosDb.update(id, changes)
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
  bearsDb.insert(bear)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

server.get('/api/bears', (req, res) => {
  bearsDb.find()
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
  bearsDb.find(id)
    .then(entry => {
      res.status(201).json(entry)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  bearsDb.remove(id)
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
  bearsDb.update(id, changes)
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
