const express = require('express');

const zoosDb = require('./zoosDb');

const router = express.Router();

router.get('/', (req, res) => {
  zoosDb
    .get()
  	.then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ error: `Server error --> ${err}` }))
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  zoosDb.getById(id)
    	.then(zoo => {
        if(zoo) {
          res.status(200).json(zoo)
        } else {
          res.status(404).json({ error: "No record found." })
        }
      })
      .catch(err => res.status(500).json({ error: `Server error --> ${err}` }))
});


router.post('/', (req, res) => {
  const zoo = req.body;

  zoosDb.add(zoo)
      .then(ids => res.status(201).json({ id: ids[0] }))
      .catch(err =>{ 
        if(err.errno === 1) {
          res.status(400).json({ error: "Error with name." })
        } else if(err.errno === 19) {
          res.status(404).json({ error: "Zoo is already in the database." })
        } else {
          res.status(500).json({ error: `Server error --> ${err}` })
        }
      })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  zoosDb.remove(id)
      .then(count =>{
        if(count) {
          res.status(200).json({ message: "Zoo deleted." })
        } else {
          res.status(404).json({ error: "No Zoo with this id." })
        }
      })
      .catch(err => res.status(500).json({ error: `Server error --> ${err}` }))
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changeZoo = req.body;

  zoosDb.update(id, changeZoo)
    	.then(count => {
        if(count) {
          res.status(200).json({ message: "Update successful." })
        } else {
          res.status(404).json({ error: "Zoo not found." })
        }
      })
      .catch(err => res.status(500).json({ error: `Server error --> ${err}` }))
});

module.exports = router;