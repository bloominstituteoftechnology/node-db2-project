const express = require('express');
const helmet = require('helmet');
const knex = require('knex'); 
const server = express();

const dbConfig = require('./knexfile')
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());


server.get('/zoos', (req, res) => {
  db('zoos').then(rows => {
    res.json(rows); 
  })
  .catch(err => { res.status(500).json({err: "we've encountered an error"})
  })
})

server.get('/zoos/:id', (req, res) => {
  const {id} = req.params; 
  db('zoos').where('id', id)
    .then( rows => {
      res.json(rows)
    })
    .catch( err => { res.status(500).json({err: "we've encounterd an error"})
    })
})

server.post('/zoos', (req, res) => {
  let name = req.body; 
  db('zoos').insert(name)
    .then( ids => {
      res.status(201).json(ids); 
    })
    .catch( err => { res.status(500).json({err: "we've encountered an error"})})
})

server.delete('/zoos/:id', (req, res) => {
  const {id} = req.params; 
  db('zoos').where('id', id).del()
    .then(rowCount => {
      res.status(201).json(rowCount)
    })
    .catch(err => { res.status(500).json({err:"we've encountered an error"})
  })
})

server.put('/zoos/:id', (req, res) => {
  const {id} = req.params;
  const zoos = req.body; 
  db('zoos').where('id', id).update(zoos)
    .then( rowCount => {
      res.status(201).json(rowCount)
    })
    .catch(err => { res.status(500).json({err: "We've encountered an error"})
  })
})

/*--------Bears Table---------------------------------------------------------------*/

server.get('/Bears', (req, res) => {
  db('Bears').then(rows => {
    res.json(rows); 
  })
  .catch(err => { res.status(500).json({err: "we've encountered an error"})
  })
})

server.get('/Bears/:id', (req, res) => {
  const {id} = req.params; 
  db('Bears').where('id', id)
    .then( rows => {
      res.json(rows)
    })
    .catch( err => { res.status(500).json({err: "we've encounterd an error"})
    })
})

server.post('/Bears', (req, res) => {
  let name = req.body; 
  db('Bears').insert(name)
    .then( ids => {
      res.status(201).json(ids); 
    })
    .catch( err => { res.status(500).json({err: "we've encountered an error"})})
})

server.delete('/Bears/:id', (req, res) => {
  const {id} = req.params; 
  db('Bears').where('id', id).del()
    .then(rowCount => {
      res.status(201).json(rowCount)
    })
    .catch(err => { res.status(500).json({err:"we've encountered an error"})
  })
})

server.put('/Bears/:id', (req, res) => {
  const {id} = req.params;
  const zoos = req.body; 
  db('Bears').where('id', id).update(zoos)
    .then( rowCount => {
      res.status(201).json(rowCount)
    })
    .catch(err => { res.status(500).json({err: "We've encountered an error"})
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
