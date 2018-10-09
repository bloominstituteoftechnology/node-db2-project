const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

router.use(express.json());
router.use(helmet());



// ==============================BEARS ENDPOINTS=====================================

// Add GET ROUTE HANDLER to get the list of bears
router.get('/', (req, res) => {
  db('bears')
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

// Add GET ROUTE HANDLER to get a bear by id
router.get('/:id', async (req, res) => {
  try{
    const { id } = req.params;

    const bear = await db('bears')
      .where({ id })
      .first();

    if (bear) {
      res.status(200).json(bear);
    } else {
      res.status(404).send({ error: "Bear id does not exist. Please provide a valid bear id." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add POST ROUTE HANDLER to create a bear
router.post('/', (req, res) => {
  if (!req.body.name){
    return res.status(400).send({ error: "Please provide a name for this bear." });
  }
  const bear = req.body;

  db.insert(bear)
    .into('bears')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Add DELETE ROUTE HANDLER to delete a bear
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  db('bears')
    .where ({ id })
    .del()
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to delete.'});
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
  });

//Add PUT ROUTE HANDLER to update a bear's name
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('bears')
    .where ({ id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to update."});
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
  });

module.exports = router;