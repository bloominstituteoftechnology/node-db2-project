const knex = require('../../database/db');
const db = require('../knex/knexController');

const tbl = 'bears';

const create = (req, res) => {
  const bear = req.body;

  db
    .create(tbl, bear)
    .then(id => res.json({ id: id[0] }))
    .catch(err => res.status(500).json({ message: 'Error saving bear.', err }));
};

const get = (req, res) => {
  db
    .get(tbl)
    .then(bears => {
      if (bears.length === 0) {
        res.json({ message: 'No bears in server.' });
        return;
      }

      res.json(bears);
    })
    .catch(err =>
      res.status(500).json({ message: 'Error retrieving bears.', err }),
    );
};

const getById = (req, res) => {
  const id = req.id;

  res.json(req.bear);
};

const update = (req, res) => {
  const { id } = req.params;
  const bear = req.body;

  db
    .update(tbl, id, bear)
    .then(editedFields => {
      db
        .getById(tbl, id)
        .then(bear => res.json(bear))
        .catch(err =>
          res.status(500).json({
            message: `Error retrieving updated bear for id ${id}`,
            err,
          }),
        );
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: `Error updating zoo with id ${id}`, err }),
    );
};

const del = (req, res) => {
  const { id } = req.params;

  db
    .del(tbl, id)
    .then(deleted => {
      res.json({ deleted: true });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error deleting bear.', err }),
    );
};

const checkId = (req, res, next) => {
  const { id } = req.params;

  db
    .getById(tbl, id)
    .then(bear => {
      if (!bear) {
        res.status(404).json({
          message: `No bear with id ${id} was found.`,
          err: `Query returned ${bear}.`,
        });
        return;
      }

      req.bear = bear;
      next();
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: `Error retrieving bear with id ${id}`, err }),
    );
};

module.exports = { create, get, getById, update, del, checkId };
