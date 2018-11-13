const express = require('express');
const knex = require('knex');

const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

const router = express.Router();

// POST a new zoo
router.post('/', async (req, res) => {
  const name = req.body;
  try {
    const id = await db.insert(name).into('zoos');
    res.status(201).json(id[0]);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

// GET Zoos
router.get('/', async (req, res) => {
  try {
    const zoos = await db.select('*').from('zoos');
    res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json({ error: 'Something when wrong getting the zoos' });
  }
});

// GET a Zoo
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const zoo = await db
      .select('*')
      .from('zoos')
      .where({ id });
    res.status(200).json({ ...zoo[0] });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong getting that zoo.' });
  }
});

// UPDATE Zoo Name
router.put('/:id', async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  try {
    const count = await db('zoos')
      .where({ id })
      .update(changes);

    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong updating that zoo.' });
  }
});

// DELETE Zoo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db('zoos')
      .where({ id })
      .del();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: 'There was a problem deleting that zoo.' });
  }
});

module.exports = router;
