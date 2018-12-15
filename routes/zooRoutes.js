const express = require('express');
const router = express.Router();

const db = require('../data/zooModel');

router.get('/', (req, res) => {
    db.get()
      .then(zoos => {
        res.json(zoos)
      })
      .catch(err => {
        res.status(500).json({ message: "Could not fetch Zoos" })
      })
  });
  
  
  router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.get(id)
      .then(zoo => {
        if(Object.keys(zoo).length === 0){
          res.status(404).json({ message: "Invalid Zoo ID" })
        } else {
          res.json(zoo)
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Could not find that Zoo" })
      })
  });
  
  router.post('/', (req, res) => {
    const zoo = req.body;
    if(zoo.name){
      db.insert(zoo)
        .then(newZoo => {
          res.status(201).json(newZoo)
        })
        .catch(err => {
          res.status(500).json({ message: "Unable to add this new zoo" })
        })
    } else{
      res.status(400).json({ message: "New zoos require a name" })
    }
  });
  
  router.put('/:id', (req, res) => {
    const {id} = req.params;
    const zoo = req.body;
  
    if(zoo.name){
      db.get(id)
        .then(response => {
          if(Object.keys(response).length === 0){
            res.status(400).json({ message: "That Zoo ID is invalid" })
          } else {
            db.update(id, zoo)
            .then(response => {
              res.json(response)
            })
            .catch(err => {
              res.status(500).json({ message: "Unable to update this Zoo" })
            })
          }
        })
        .catch(err => {
          res.status(500).json({ message: "Could not fetch that zoo" })
        })
    } else {
      res.status(400).json({ message: "Every Zoo needs a name!" })
    }
  });
  
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.get(id)
      .then(response => {
        const theZoo = response;
        if(Object.keys(response).length === 0){
          res.status(400).json({ message: "That Zoo ID is invalid" })
        } else {
          db.remove(id)
            .then(response => {
              if(response){
                res.json(theZoo)
              }
            })
            .catch(err => {
              res.status(500).json({ message: "This Zoo could not be deleted" })
            })
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Could not fetch that Zoo" })
      })
  });

  module.exports = router;