const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');


const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;

server.get('/', (req, res) => {
  res.json({message: "Server up and running!!"})
});

// INSERT INTO zoos (name) VALUES ('Hoogle Zoo');
server.post('/zoos', (req, res) => {
  const zoo =req.body;

  db('zoos')
  .insert(zoo)
  .then((ids) => {
    res.status(201).json(ids);
  })
  .catch(err => {
    // console.log(err);
    res.status(500).json({ err: "Failed to insert zoo" });
  });
});

// SELECT * FROM zoos;
server.get('/zoos', (req, res) => {
  db('zoos')
  .then(rows => {
    res.json(rows);
  })
  .catch(err => {
    // console.log(err);
    res.status(500).json({ err: "Failed to find zoos" });
  })
})

// SELECT * FROM crayons WHERE id = 1
server.get('/zoos/:id', (req, res) => {
  const id = req.params.id;
  db('zoos').where('id', id)
  .then(row => {
    res.json(row);
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to find zoo" });
  });
});

// UPDATE zoos SET name = 'something to update" WHERE id = 1
server.put('/zoos/:id', (req, res) => {
  const {id} = req.params;
  const zoo = req.body;

  db('zoos').where('id', id)
  .update(zoo)
  .then(rowCount => {
    res.json(rowCount);
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to update zoo" });
  });
});

// DELETE FROM crayons WHERE id = 1;
server.delete('/zoos/:id', (req, res) => {
  const {id} = req.params;

  db('zoos').where('id', id)
  .del()
  .then(rowCount => {
    res.status(201).json(rowCount);
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to delete zoo" });
  });
});


server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
