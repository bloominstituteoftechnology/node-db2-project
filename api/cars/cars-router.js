const express = require('express')
const db = require('../../data/dbconfig')
const router = express.Router()

router.get('/', (req,res,next) =>{
    db('cars')
        .then(c =>{
            res.json(c);
        })
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
  
    db('cars').where({ id }).first()
      .then(f => {
        res.json(f);
      })
      .catch(next);
  });
  
  router.post('/', (req, res, next) => {
    const dt = req.body;
    db('cars').insert(dt)
      .then(ids => {
        return db('cars').where({ id: ids[0] })
      })
      .then(vf => {
        res.status(201).json(vf);
      })
      .catch(next);
  });


/*
"description": "Like a gold watch",
        "color": "Gold",
        "producer": "Ford",
        "wheels": 4,
        "motor": "TN6Cy",
        "vin": "23aSd3jf2ff",
        "liscense plate": "ADSD3jf CA",
        "addons": "Discplayer With XM Satilite Radio"
*/

router.use((err, req, res, next) => {
    const env = process.env.NODE_ENV || 'development';
    const message = env === 'development'
      ? err.message
      : 'something bad happened';
    res.status(500).json(message);
  })

module.exports = router;