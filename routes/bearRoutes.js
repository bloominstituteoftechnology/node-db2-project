const express = require('express');
const router = express.Router();

const db = require('../data/bearModel');

router.get('/', (req, res) => {
    db.get()
      .then(bears => {
        res.json(bears)
      })
      .catch(err => {
        res.status(500).json({ message: "Could not fetch bears" })
      })
  });
  
  
  router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.get(id)
      .then(bear => {
        if(Object.keys(bear).length === 0){
          res.status(404).json({ message: "Invalid bear ID" })
        } else {
          res.json(bear)
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Could not find that bear" })
      })
  });
  
  router.post('/', (req, res) => {
    const bear = req.body;
    if(bear.name){
      db.insert(bear)
        .then(newBear => {
          res.status(201).json(newBear)
        })
        .catch(err => {
          res.status(500).json({ message: "Unable to add this new bear" })
        })
    } else{
      res.status(400).json({ message: "New bears require a name" })
    }
  });
  
  router.put('/:id', (req, res) => {
    const {id} = req.params;
    const bear = req.body;
  
    if(bear.name){
      db.get(id)
        .then(response => {
          if(Object.keys(response).length === 0){
            res.status(400).json({ message: "That bear ID is invalid" })
          } else {
            db.update(id, bear)
            .then(response => {
              res.json(response)
            })
            .catch(err => {
              res.status(500).json({ message: "Unable to update this bear" })
            })
          }
        })
        .catch(err => {
          res.status(500).json({ message: "Could not fetch that bear" })
        })
    } else {
      res.status(400).json({ message: "Every bear needs a name!" })
    }
  });
  
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.get(id)
      .then(response => {
        const theBear = response;
        if(Object.keys(response).length === 0){
          res.status(400).json({ message: "That bear ID is invalid" })
        } else {
          db.remove(id)
            .then(response => {
              if(response){
                res.json(theBear)
              }
            })
            .catch(err => {
              res.status(500).json({ message: "This bear could not be deleted" })
            })
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Could not fetch that bear" })
      })
  });

module.exports = router;