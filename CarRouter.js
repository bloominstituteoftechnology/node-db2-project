const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const router = express.Router();


router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
    res.status(500).json({ message: 'unable to retrieve cars' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('fruits')
  .where({ id })
  .first()
  .then(car => {
    res.json(car);
  }) 
  .catch (err => {
    res.status(500).json({ message: 'unable to retrieve cars with given id' });
  });
});

router.post('/', (req, res) => {
  const change = req.body;
  !change
    ? res.status(400).json({ error: 'you are missing either name or budget' })
    : db('cars')
    .insert(change)
    .then(ids => {
        db('cars').where({ id: ids[0] })
        .then(newCar => {
        res.status(201).json(newCar);
        });
    })
    .catch (err => {
        console.log('POST error', err);
        res.status(500).json({ message: "uanble to add data" });
    });
});


router.put("/:id", (req, res) => {
    const changes = req.body;
	const idz = req.params.id;
    db("cars")
        .where({id: idz})
        .update(changes)
        .then(count => res.status(200).json( { RecordUpdated: count, changes}))
        .catch(err => res.status(500).json({  message: "could not update car with given id"}))
})

router.delete("/:id", (req, res) => {
    const idz = req.params.id;
    db("cars")
        .where({ id: idz})
        .del()
        .then(accountOne => res.status(200).json({RecordDeleted: accountOne}))
        .catch(err => res.status(500).json({ message: "unable to delete car with given id"}))
})

module.exports = router;