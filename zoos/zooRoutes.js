const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
 
const dbConfig = require('../knexfile');
 
const db = knex(dbConfig.development);

const router = express.Router();

router.use(express.json());
router.use(helmet());


// zoo endpoints

router.get('/', (req,res) => {
    db('zoos')
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(err => res.status(500).json(err))
  });
  
  router.get('/:id', (req,res) => {
    db('zoos')
    .where({ id: req.params.id })
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(err => res.status(500).json(err))
  });
  
  router.post('/', (req, res) => {
    const zoo = req.body;
    if(!zoo) {
      res.status(400).status({ message: "Please provide zoo name."})
    }
    db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err))
  });
  
  router.delete('/:id', (req,res) => {
    db('zoos')
    .where({ id: req.params.id})
    .del()
    .then(count => {
      if(count) {
        res.status(204).end()
      } else {
        res.status(404).json({ message: "There was no zoo with this id found"})
      }
    })
    .catch(err => res.status(500).json(err))
  });
  
  router.put('/:id', (req,res) => {
    const zoo = req.body;
    db('zoos')
    .where({id: req.params.id})
    .update(zoo)
    .then(zoo => {
      if(zoo) {
        res.status(200).json({ message: "This zoo has been updated"})
      } else {
        res.status(404).json({ message: "No zoo with thi id was found"})
      }
    })
    .catch(err => {
      res.status(500).json({ message:"Update Failed"})
    })
  });

  module.exports = router;