const express = require('express');
const router = express.Router();
const db = require('../helpers/bearHelper')

router.post('/', (req, res) => {
  const bear = req.body;
  if(bear.name.length !== 0) {
    db.insert(bear)
      .then(bear => {
        res
          .status(201)
          .json(bear.id)
      })
      .catch(error => {
        console.log(error, bear),
        res
          .status(500)
          .json({ error: "There was a problem adding bear to the database..."})
      })
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide a bear name."})
  }
})

router.get('/', (req, res) => {
  db.find()
    .then(bears => {
      res 
        .status(200)
        .json(bears)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't get the bears list", err})
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(bear => {
      if (bear.length !== 0) {
        console.log(bear)
        res
          .status(200)
          .json(bear);
      } else {
        res
          .status(404)
          .json({ errorMessage: "There is no bear with that ID number in this database." })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "Sorry, we are having trouble getting the bear you're looking for." })
    })
})

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res
        .status(200)
        .json(count);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Error removing bear from database!"})
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if(changes.name.length > 0) {
    db.update(id, changes)
      .then(count => {
        if (count) {
          res 
            .status(200)
            .json({ message: "bear updated" })
        } else {
          res 
            .status(404)
            .json({ errorMessage: "Can't update a bear record that doesn't exist..."})
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "Sorry, we had an error updating that bear record.", error})
      })
  } else {
    res
      .status(406)
      .json({ errorMessage: "bear name cannot be blank!" })
  }
})

module.exports = router;