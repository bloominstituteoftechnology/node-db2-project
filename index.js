const express = require('express');
const helmet = require('helmet');
const db = require('./db');
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.json({ api: 'Server is Alive!'})
})

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if(zoo.name.length !== 0) {
    db.insert(zoo)
      .then(zoo => {
        res
          .status(201)
          .json(zoo.id)
      })
      .catch(error => {
        console.log(error, zoo),
        res
          .status(500)
          .json({ error: "There was a problem adding zoo to the database..."})
      })
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide a zoo name."})
  }
})

server.get('/api/zoos', (req, res) => {
  db.find()
    .then(zoos => {
      res 
        .status(200)
        .json(zoos)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't get the zoos list", err})
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(zoo => {
      if (zoo.length !== 0) {
        console.log(zoo)
        res
          .status(200)
          .json(zoo);
      } else {
        res
          .status(404)
          .json({ errorMessage: "There is no zoo with that ID number in this database." })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "Sorry, we are having trouble getting the zoo you're looking for." })
    })
})

server.delete('/api/zoos/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res
        .status(200)
        .json(count);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Error removing zoo from database!"})
    })
})

server.put('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if(changes.name.length > 0) {
    db.update(id, changes)
      .then(count => {
        if (count) {
          res 
            .status(200)
            .json({ message: "Zoo updated" })
        } else {
          res 
            .status(404)
            .json({ errorMessage: "Can't update a zoo record that doesn't exist..."})
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "Sorry, we had an error updating that zoo record.", error})
      })
  } else {
    res
      .status(406)
      .json({ errorMessage: "Zoo name cannot be blank!" })
  }
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
