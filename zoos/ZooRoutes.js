const express = require('express');
const knex = require('knex');

const router = express.Router();

const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);


router.get('/', (req, res) => {
  db('zoos').select('name')
  .then(names => {
    console.log(names)
    res.status(200).json(names)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('zoos').where({id}).select('name')
  .then(name => {
    console.log(name)
    res.status(200).json(name)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.post('/', (req, res) => {
  const name = req.body;

  db.insert(name).into('zoos')
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

  db('zoos').where({id}).del()
  .then(count => {
    console.log(count);
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db('zoos').where({id}).update({name})
  .then(count => {
    console.log(count);
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})



module.exports = router;