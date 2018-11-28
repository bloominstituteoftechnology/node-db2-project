const express = require('express');
const helmet = require('helmet');

const server = express();
const db = require('./db');
server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.json({ api: 'Server is alive!' });
});
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if (zoo.name.length !== 0) {
    db.insert(zoo)
      .then(zoo => {
        res.status(201).json(zoo.id);
      })
      .catch(error => {
        console.log(error, zoo),
          res.status(500).json({ error: 'error adding' });
      });
  } else {
    res.status(400).json({ errorMessage: 'zoo name required.' });
  }
});
server.get('/api/zoos', (req, res) => {
  db.find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: 'zoo list not retrieved', err });
    });
});
server.get('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(zoo => {
      if (zoo.length !== 0) {
        console.log(zoo);
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ errorMessage: 'no zoo with that ID.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'not found.' });
    });
});
server.delete('/api/zoos/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Error removing zoo' });
    });
});
server.put('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (changes.name.length > 0) {
    db.update(id, changes)
      .then(count => {
        if (count) {
          res.status(200).json({ message: 'updated' });
        } else {
          res.status(404).json({ errorMessage: 'cannot update' });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: 'cannot update.', error });
      });
  } else {
    res.status(406).json({ errorMessage: 'need name' });
  }
});
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
