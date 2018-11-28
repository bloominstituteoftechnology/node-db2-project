const express = require('express');
const router = express.Router();
const db = require('../helpers/zooHelper')

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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
        .json({ errorMessage: "Error removing zoo from database!"})
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

module.exports = router;