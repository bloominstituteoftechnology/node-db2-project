const express = require('express');
const knex = require('knex');

const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

const router = express.Router();


router.get('/', (req, res) => {
  db('bear').select('name')
  .then(bears => {
    console.log(bears)
    bears.length === 0 ?
    res.status(200).json({message: 'No Bears Listed, Send a Post request to list a Bear'})
    :
    res.status(200).json(bears)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('bear').where({id}).select('name')
  .then(bear => {
    console.log(bear)
    bear.length === 0 ?
    res.status(400).json({message: 'No Bear Listed, check your id'})
    :
    res.status(200).json(bear)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.post('/', (req, res) => {

  !req.body.name ?
  res.status(400).json({message: 'You need a valid name'})
  :
  null

  const name = req.body;

  db.insert(name).into('bear')
  .then(count => {
    console.log(count);
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('bear').where({id}).del()
  .then(count => {
    console.log(count);
    count === 0 ?
    res.status(400).json({message: 'Error deleting Bear, check your id'})
    :
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


router.put('/:id', (req, res) => {
  const { id } = req.params;

  !req.body.name ?
  res.status(400).json({message: 'You need a valid name'})
  :
  null

  const name = req.body;

  db('bear').where({id}).update(name)
  .then(count => {
    console.log(count);
    count === 0 ?
    res.status(400).json({message: 'Error updating Bear, check your id'})
    :
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


module.exports = router;
