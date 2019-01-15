const express = require('express')
const router = express.Router()

const knex = require('knex')
const dbConfig = require('../../knexfile')
const db = knex(dbConfig.development)

//endpoints

router.post('/', (req, res) => {
  const zoo = req.body;
  if(zoo.name){
    db('zoos').insert(zoo)
      .then(id => {
        res
          .status(201)
          .json(id)
      })
      .catch(err => {
        res
          .status(500)
          .json({err: 'Failed to add zoo'})
      })
  } else {
    res
      .status(400)
      .json({err: 'Missing zoo name'})
  }
})

router.get('/', (req, res) => {
  db('zoos')
    .then(rows => {
      res.json(rows)
    })
    .catch(err=> {
      res
        .status(500)
        .json({err: 'Failed to get zoos'})
    })
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  db('zoos').where('id', id)
    .then(row => {
      if(row.length !== 0) {
        res.json(row)
      } else {
        res
          .status(404)
          .json({err: 'No zoo under current id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to get zoo'})
    })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  db('zoos').where('id', id).del()
    .then(rowCount => {
      if(rowCount !== 0){
        res.json(rowCount)
      } else {
        res
          .status(404)
          .json({err: 'No zoo under current id'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({err: 'Failed to delete zoo'})
    })
})

router.put('/:id', (req, res) =>{
  const {id} = req.params;
  const zoo = req.body;

  if(zoo.name) {
    db('zoos').where('id', id).update(zoo)
      .then(rowCount => {
        if(rowCount !== 0) {
          res
            .status(200)
            .json(rowCount)
        } else {
          res
            .status(404)
            .status({err: 'No zoo under that id'})
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({err: 'Failed to update zoo'})
      })
  }
})

module.exports = router;
