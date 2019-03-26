const express = require("express");
const router = express.Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
}

const db = knex(knexConfig);

router.get('/', (req, res) => {
  db('bears')
  .then(bears => {
    res.status(200).json(bears);
  })
  .catch(error => {
    res.status(500).json(error);
  })
})

router.get('/:id', async (req, res) => {
  const bearId = req.params.id;
  try {
    const bear = await db('bears').where({ id: bearId }).first()
    res.status(200).json(bear);
  } catch (error) {
    res.status(500).json({ message: "ERrOr, CaN'T CoMpUtE"})
  }
})

router.post('/', async (req, res) => {
  try {
    const bearIds = await db('bears').insert(req.body);
    const id = bearIds[0];
    const bear = await db('bears').where({ id }).first();
    res.status(201).json(bear);
  } catch (error) {
    res.status(500).json({ message: "ERrOr, CaN'T CoMpUtE"})
  }

})

module.exports = router;