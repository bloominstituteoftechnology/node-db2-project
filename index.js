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

// Zoo Stuff here

// INSERT INTO zoos (name) VALUES ('Hoogle Zoo');
server.post('/zoos', (req, res) => {
  const zoo =req.body;

  if (zoo.name) {
    db('zoos')
    .insert(zoo)
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ err: "Failed to insert zoo" });
    });
  } else {
    res.status(400).json({ message: "Please provide zoo name" });
  }
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

// SELECT * FROM zoos WHERE id = 1
server.get('/zoos/:id', (req, res) => {
  const id = req.params.id;
  db('zoos').where('id', id)
  .then(row => {
    if (row.length > 0) {
      res.json(row);
    } else {
      res.status(404).json({ err: "The zoo with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to find zoo" });
  });
});

// UPDATE zoos SET name = 'something to update' WHERE id = 1
server.put('/zoos/:id', (req, res) => {
  const {id} = req.params;
  const zoo = req.body;

  if (zoo.name) {
    db('zoos').where('id', id)
    .update(zoo)
    .then(rowCount => {
      if (rowCount) {
        res.json(rowCount);
      } else {
        res.status(404).json({ message: "The zoo with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to update zoo" });
    });
  } else {
    res.status(400).json({ message: "Please provide zoo name" });
  }
});

// DELETE FROM crayons WHERE id = 1;
server.delete('/zoos/:id', (req, res) => {
  const {id} = req.params;

  db('zoos').where('id', id)
  .del()
  .then(rowCount => {
    if (rowCount) {
      res.status(201).json(rowCount);
    } else {
      res.status(404).json({ message: "The zoo with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to delete zoo" });
  });
});

// Bears stuff here:

// INSERT INTO bears (name) VALUES ('Polar Bear');
server.post('/bears', (req, res) => {
  const bear =req.body;

  if (bear.name) {
    db('bears')
    .insert(bear)
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ err: "Failed to insert bear" });
    });
  } else {
    res.status(400).json({ message: "Please provide bear name" });
  }
});

// SELECT * FROM bears;
server.get('/bears', (req, res) => {
  db('bears')
  .then(rows => {
    res.json(rows);
  })
  .catch(err => {
    // console.log(err);
    res.status(500).json({ err: "Failed to find bears" });
  })
})

// SELECT * FROM bears WHERE id = 1
server.get('/bears/:id', (req, res) => {
  const id = req.params.id;
  db('bears').where('id', id)
  .then(row => {
    if (row.length > 0) {
      res.json(row);
    } else {
      res.status(404).json({ err: "The bear with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to find bear" });
  });
});

// UPDATE bears SET name = 'something to update' WHERE id = 1
server.put('/bears/:id', (req, res) => {
  const {id} = req.params;
  const bear = req.body;

  if (bear.name) {
    db('bears').where('id', id)
    .update(bear)
    .then(rowCount => {
      if (rowCount) {
        res.json(rowCount);
      } else {
        res.status(404).json({ message: "The bear with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to update bear" });
    });
  } else {
    res.status(400).json({ message: "Please provide bear name" });
  }
});

// DELETE FROM bears WHERE id = 1;
server.delete('/bears/:id', (req, res) => {
  const {id} = req.params;

  db('bears').where('id', id)
  .del()
  .then(rowCount => {
    if (rowCount) {
      res.status(201).json(rowCount);
    } else {
      res.status(404).json({ message: "The bear with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to delete bear" });
  });
});

// Always at bottom!

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
