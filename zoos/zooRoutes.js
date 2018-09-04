const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

const router = express.Router();

router.use(express.json());
router.use(helmet());

// endpoints here
router.get('/', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id})
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  const zoo = req.body;
  if(!zoos) {
    res.status(400).json({ message: "Please provide a zoo name."})
  }
  db.insert(zoo)
  .into('zoos')
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id })
  .del()
  .then(count => {
    if(count) {
      res.status(204).end()
    } else {
      res.status(404).json({ message: "No zoo with this ID was found."})
    } 
  })
  .catch(err => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  const zoo = req.body;
  console.log(zoo)
  db('zoos')
  .where({ id: req.params.id})
  .update(zoo)
  .then(zoo => {
    if(zoo) {
      res.status(200).json({ message: 'Update Completed'})
    } else {
      res.status(404).json({ message: "No zoo with this ID was found."})
    }    
  })
  .catch(err => {
    res.status(500).json({ message: 'Update Failed!'})
  })
});

module.exports = router;