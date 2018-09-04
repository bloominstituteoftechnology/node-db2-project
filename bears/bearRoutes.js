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
  db('bears')
  .then(bears => {
    res.status(200).json(bears)
  })
  .catch(err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
  db('bears')
  .where({ id: req.params.id})
  .then(bears => {
    res.status(200).json(bears)
  })
  .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
  const bear = req.body;
  if(!bear) {
    res.status(400).json({ message: "Please provide a bear name."})
  }
  db.insert(bear)
  .into('bears')
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
  db('bears')
  .where({ id: req.params.id })
  .del()
  .then(count => {
    if(count) {
        res.status(204).end()
    } else {
      res.status(404).json({ message: "No bear with this ID was found."})
    } 
  })
  .catch(err => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  const bear = req.body;
  console.log(bear)
  db('bears')
  .where({ id: req.params.id})
  .update(bear)
  .then(bear => {
    if(bear) {
      res.status(200).json({ message: 'Update Completed'})
    } else {
      res.status(404).json({ message: "No bear with this ID was found."})
    }    
  })
  .catch(err => {
    res.status(500).json({ message: 'Update Failed!'})
  })
});

module.exports = router;