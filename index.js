const express = require('express');
const knex = require('knex');       //require from local install
const helmet = require('helmet');

const dbConfig = require('./knexfile');    //require from knexfile.js


const server = express();
const db = knex(dbConfig.development);    // the only module in knexfile.js

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req , res) => {
  res.send(`We are live on PORT ${port}` )
})

// INSERT INTO zoos (name)
server.post('/api/zoos', (req , res) => {
  const zoo = req.body;
  console.log('zoo info', zoo)

  db('zoos').insert(zoo)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: "Failed to insert zoo"});
  })
})

// INSERT INTO bears (name)
server.post('/api/bears', (req , res) => {
  const bear = req.body;
  console.log('bear info', bear)

  db('bears').insert(bear)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: "Failed to insert bear"});
  })
})


// GET /api/zoos
// SELECT * FROM zoos
server.get('/api/zoos', (req , res) => {
  db('zoos') 
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: "Fail to find zoo"});
  })
})

// GET /api/bears
// SELECT * FROM bears
server.get('/api/bears', (req , res) => {
  db('bears') 
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: "Fail to find bears"});
  })
})


// GET /api/zoos/:id
// SELECT * FROM zoos WHERE id = '2'
server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  db('zoos').where('id', id)
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: 'Failed to find specific zoo'});
  })
})

// GET /api/bears/:id
// SELECT * FROM bears WHERE id = '2'
server.get('/api/bears/:id', (req, res) => {
  const {id} = req.params;
  db('bears').where('id', id)
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: 'Failed to find specific bear'});
  })
})

// DELETE /api/zoos/:id
// DELETE FROM zoos WHERE id = 2;
server.delete('/api/zoos/:id', (req , res) => {
  const {id} = req.params;
  db('zoos').where('id', id).del()
  .then(rowCount => {
    res.status(201).json(rowCount)
  })
  .catch(err => {
    res.status(500).json({err: "Failed to delete zoo"})
  });
})

// DELETE /api/bears/:id
// DELETE FROM bears WHERE id = 2;
server.delete('/api/bears/:id', (req , res) => {
  const {id} = req.params;
  db('bears').where('id', id).del()
  .then(rowCount => {
    res.status(201).json(rowCount)
  })
  .catch(err => {
    res.status(500).json({err: "Failed to delete bear"})
  });
})

// PUT /api/zoos/:id
// UPDATE zoos SET name = 'NEW ZOO'
server.put('/api/zoos/:id', (req , res) => {
  const {id} = req.params;
  const zoo = req.body;

  db('zoos').where('id', id).update(zoo)
  .then(rowCount => {
    res.status(200).json(rowCount)
  })
  .catch(err => {
    res.status(500).json({err: 'Failed to update zoo'});
  })
})

// PUT /api/bears/:id
// UPDATE bears SET name = 'NEW BEAR'
server.put('/api/bears/:id', (req , res) => {
  const {id} = req.params;
  const bear = req.body;

  db('bears').where('id', id).update(bear)
  .then(rowCount => {
    res.status(200).json(rowCount)
  })
  .catch(err => {
    res.status(500).json({err: 'Failed to update bear'});
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
