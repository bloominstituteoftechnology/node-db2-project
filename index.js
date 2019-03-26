const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3',
  },
  debug: true,                          // TODO: remove this before deploying
}

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(error => {
    res.status(500).json(error);
  })
})

server.get('/api/zoos/:id', (req, res) => {
  const zooid = req.params.id;
  db('zoos')
  .where({ id: zooid })
  .first()
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(error => {
    res.status(500).json(error);
  })
})

server.post('/api/zoos', (req, res) => {
  db('zoos')
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db('zoos')
        .where({ id })
        .first()
        .then(zoo => {
          res.status(201).json(zoo);
        })
    })
    .catch(error => {
      res.status(500).json({ message: "ERrOr, CaN'T CoMpUtE"})
    })
})

server.put("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db('zoos')
        .where({ id: req.params.id })
        .first()
        .then(zoos => {
          res.status(200).json(zoos);
        })
        // res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Zoo not found. Can not update" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id })
  .del()
  .then(count => {
    if( count > 0){
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Zoo was not found' });
    }
  })
  .catch(error => {
    res.status(500).json({ message: "Internal server error"})
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
