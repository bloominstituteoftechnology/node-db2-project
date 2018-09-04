const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();

server.use(express.json());
server.use(helmet());

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

// endpoints here

//zoos
server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  if (!zoo.name) {
    res.status(400).json({
      message: "Name is required."
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

server.get("/api/zoos", (req, res) => {
  db('zoos')
  .then( zoos => {
    res.status(200).json(zoos);
  })
  .catch( err => {
    res.status(500).json(err);
  });
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db('zoos')
  .where({ id })
  .then( zoo => {
    res.status(200).json(zoo);
  })
  .catch( err => {
    res.status(500).json(err);
  });
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  if ( !updated.name ) {
    res.status(400).json({
      message: "Name is required."
    })
  } else {
    db('zoos')
    .where({ id })
    .update(updated)
    .then( update => {
      res.status(200).json(update);
    })
    .catch( err => res.status(500).json(err));
  }
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

//bears
server.post("/api/bears", (req, res) => {
  const bear = req.body;
  if ( !bear.name ) {
    res.status(400).json({
      message: "Bear name is required."
    });
  }
  else {
    db.insert(bear)
      .into('bears')
      .then( ids => {
        res.status(201).json(ids);
      })
      .catch( err => res.status(500).json(err));
  };
});

server.get("/api/bears", (req, res) => {
  db('bears')
    .then( bears => {
      res.status(200).json(bears);
    })
    .catch( err => {
      res.status(500).json(err);
    });
});

server.get("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  db('bears')
    .where({ id })
    .then( bear => {
      res.status(200).json(bear);
    })
    .catch( err => res.status(500).json(err));
});

server.put("/api/bears/:id", (req, res) => {
  const updated = req.body;
  const { id } = req.params;
  if( !updated.name ) {
    res.status(400).json({
      message: "Name is required."
    });
  } else {
    db('bears')
    .where({ id })
    .update(updated)
    .then( bear => {
      res.status(200).json(bear);
    })
    .catch( err => res.status(500).json(err));
  };
});

server.delete("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  db('bears')
    .where({ id })
    .del()
    .then( count => {
      res.status(200).json(count);
    })
    .catch( err => res.status(500).json(err)
  )}
);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
