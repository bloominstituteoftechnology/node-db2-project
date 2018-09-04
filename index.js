const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();

const dbConfig = require("./knexfile"); 
const db = knex(dbConfig.development); 


server.use(express.json());
server.use(helmet());


// endpoints here
server.get("/", (req, res)=>{
  res.send("testing..."); 
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
      .then(zoos => {
          res.status(200).json(zoos);
      })
      .catch(err => res.status(500).json(err));
})

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db('zoos')
  .where('id', '=', id)
  .then( zoo => {
    res.status(200).json(zoo);
  })
  .catch( err => {
    res.status(500).json(err);
  });
});

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  if (!zoo.name) {
    res.status(400).json({
      message: "Name required."
    });
  } else {
    db.insert(zoo)
      .into('zoos')
      .then( ids => {
        res.status(201).json(ids);
      })
      .catch( err => {
        res.status(500).json(err);
      })
  };
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  db('zoos')
    .where({ id })
    .update(updated)
    .then( update => {
      res.status(200).json(update);
    })
    .catch( err => res.status(500).json(err));
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .del()
    .then( count => {
      res.status(200).json(count);
    })
    .catch( err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
