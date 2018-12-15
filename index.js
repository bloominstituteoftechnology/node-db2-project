const express = require('express');
const knex = require("knex");
const dbConfig = require("./knexfile");
const helmet = require('helmet');
const server = express();
//const cors = require('cors');
//const db = require('./data/dbConfig');
const DB = knex(dbConfig.development);
const parser = express.json();
const PORT = 3300;
const logger = require('morgan');
//const projectRouter = require('./routers/projectRouter');
//const actionRouter = require('./routers/actionRouter')

server.use(express.json());
server.use(helmet());
//server.use(cors({}));
server.use(parser);
server.use(logger('tiny'));
//server.use(helmet());
// endpoints here

server.get('/api/zoos', (req, res) => {
DB('zoos')
    .then(zoo => {
      res.json(zoo);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  DB("zoos")
    .where("id", id)
    .then(zoo => {
      res.json(zoo);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});


server.post("/api/zoos", (req, res) => {
  const name = req.body;
 
  DB("zoos")
    .insert(name)
    .then(ids => {
      res.status(201).json({ ids });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.put("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  const zoo = req.body;
  DB("zoos")
    .where("id", id)
    .update(zoo)
    .then(zoo => {
      res.json({ message: 'Zoo successfully updated' });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  DB('zoos')
    .where('id', id)
    .del()
    .then(zoo => {
      res.status(200).json({ message: 'Zoo successfully deleted' });
    })
    .catch(err => {
      res.status(500).json({ err: 'failed to update crayons' })
    });
});

//server.listen(PORT, console.log(`Listening on PORT:${PORT}`));

server.listen(PORT, function () {
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
});

