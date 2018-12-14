const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

/* ---------- Middleware ---------- */
server.use(express.json());
server.use(helmet());


/* ---------- End Points ---------- */
// INSERT INTO zoos (name) VALUES (body);
server.post('/api/zoos', (req, res) => {
  const zooData = req.body;

  // Check for empty name:
  if( !zooData.name ){
    res.status(400).json({ error: "Please provide the name of the zoo." });
  } else {
    db('zoos').insert(zooData)
      .then( (ids) => {
        res.status(201).json(ids);
      })
      .catch( err => {
        res.status(500).json({ error: "Could not delete zoo."});
      });
    // db
  }
});

// SELECT * FROM zoos;
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then( (rows) => {
      res.json(rows);
    })
    .catch( err => {
      res.status(500).json({ error: "Could not get list of zoos."});
    });
});

// SELECT * FROM zoos WHERE id={:id};
server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params;

  db('zoos').where('id', id)
    .then( (rows) => {
      res.json(rows);
    })
    .catch( err => {
      res.status(500).json({ error: "Could not get zoo."});
    });
  // db
});

// DELETE FROM zoos WHERE id={:id};
server.delete('/api/zoos/:id', (req, res) => {});

// UPDATE zoos SET name={name} WHERE id={:id};
server.put('/api/zoos/:id', (req, res) => {});


/* ---------- Listener ---------- */
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
