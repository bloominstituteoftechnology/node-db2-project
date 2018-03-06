const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db.js')

const server = express();

server.use(bodyParser.json());

// endpoints here

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' })
});

server.post('/zoos', (req, res) => {
  const zoo = req.body;

  knex
    .insert(zoo).into('zoos')
    .then(ids => {
      res.status(201).json({ ids })
    })
    .catch(error => {
      res.status(500).json({ message: 'error' });
    });
});

server.post('/bears', (req, res) => {
  const bear = req.body;

  knex
    .insert(bear).into('bears')
    .then(ids => {
      res.status(201).json({ ids });
    })
    .catch(error => {
      res.status(500).json({ message: 'error' })
    });
});

server.get('/zoos', (req, res) => {
  knex('zoos').then(
    zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving Zoos' });
    });
});

server.get('/bears', (req, res) => {
  knex('bears')
    .then(bears => {
      res.status(200).json({ bears });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving Bears' })
    });
});

server.get('/zoos/:id', (req, res) => {
  const { id } = req.params;
  knex('zoos')
    .where('id', id)
    .then(zoos => {
      if (zoos.length > 0) {
        res.status(200).json(zoos);
      } else {
        res.status(404).json({ message: `Zoo with id: ${id} does not exist` })
      }

    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving Zoos' });
    });
});

server.get('/bears/:id', (req, res) => {
  const { id } = req.params;
  knex('bears')
    .where('id', id)
    .then(bears => {
      if (bears.length > 0) {
        res.status(200).json(bears);
      } else {
        res.status(404).json({ message: `Bear with id: ${id} does not exist` });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving Bears' });
    });
});



server.delete('/zoos/:id', (req, res) => {
  const { id } = req.params;
  knex('zoos').where({ id }).del()
    .then(response => {
      res.status(200).json({ success: true });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error deleting this Zoo' })
    });
});

server.delete('/bears/:id', (req, res) => {
  const { id } = req.params;
  knex('bears').where('id', id).del()
    .then(response => {
      res.status(200).json({ success: true });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error deleting this Bear' })
    });
});

const port = 3000;
server.listen(port, function () {
  console.log(`Server Listening on ${port}`);
});
