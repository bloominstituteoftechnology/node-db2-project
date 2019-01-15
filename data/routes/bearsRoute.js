const express = require('express')
const router = express.Router()

const knex = require('knex')
const dbConfig = require('../../knexfile')
const db = knex(dbConfig.development)

router.post('/', (req, res) => {
  const bear = req.body;
  if(bear.name){
    db('bears').insert(bear)
      .then(id => {
        res
          .status(201)
          .json(id)
      })
      .catch(err => {
        res
          .status(500)
          .json({err: 'Failed to add bear'})
      })
  } else {
    res
      .status(400)
      .json({err: 'Missing bear name'})
  }
})

router.get('/', (req, res) => {
  db('bears')
    .then(rows => {
      res.json(rows)
    })
    .catch(err=> {
      res
        .status(500)
        .json({err: 'Failed to get bears'})
    })
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  db('bears').where('id', id)
    .then(row => {
      if(row.length !== 0) {
        res.json(row)
      } else {
        res
          .status(404)
          .json({err: 'No bear under current id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to get bear'})
    })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  db('bears').where('id', id).del()
    .then(rowCount => {
      if(rowCount !== 0){
        res.json(rowCount)
      } else {
        res
          .status(404)
          .json({err: 'No bear under current id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to delete bear'})
    })
})

router.put('/:id', (req, res) =>{
  const {id} = req.params;
  const bear = req.body;

  if(bear.name) {
    db('bears').where('id', id).update(bear)
      .then(rowCount => {
        if(rowCount !== 0) {
          res
            .status(200)
            .json(rowCount)
        } else {
          res
            .status(404)
            .status({err: 'No bear under that id'})
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({err: 'Failed to update bear'})
      })
  }
})

module.exports = router;