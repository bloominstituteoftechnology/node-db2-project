// zoosRoutes.js
const express = require('express')
const knex = require('knex')

const knexConfig = require('../../knexfile.js')
const db = knex(knexConfig.development)

const router = express.Router();

const getAllZoos = (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error)
    });
}

const getZoo = (req, res) => {
  const { id } = req.params

  db('zoos')
    .where('id', id)
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error)
    });
}

const addZoo = (req, res) => {
  const { name } = req.body
  console.log(name)

  db('zoos')
    .insert({ name })
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error)
    });
}

const updateZoo = (req, res) => {
  const changes = req.body
  const { id } = req.params

  db('zoos')
    .where('id', id)
    .update(changes)
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error)
    });
}

const deleteZoo = (req, res) => {
  const changes = req.body
  const { id } = req.params

  db('zoos')
    .where('id', id)
    .del()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error)
    });
}

const echo = (req, res) => {
  res.status(200).json({
    message: 'hey this endpoint work!',
    params: req.params,
    query: (req.query ? req.query : ''),
    body: req.body
  });
}

router.post('/', addZoo)
router.get('/', getAllZoos)
router.get('/:id', getZoo)
router.put('/:id', updateZoo)
router.delete('/:id', deleteZoo)

module.exports = router;
