const knex = require('../../database/db');
const db = require('../knex/knexController');

const tbl = 'zoos';

const create = (req, res) => {
  const zoo = req.body;

  db
    .create(tbl, zoo)
    .then(id => res.json({ id: id[0] }))
    .catch(err => res.status(500).json({ message: 'Error saving zoo.', err }));
};

const get = (req, res) => {
  db
    .get(tbl)
    .then(zoos => {
      if (zoos.length === 0) {
        res.json({ message: 'No zoos in server.' });
        return;
      }

      res.json(zoos);
    })
    .catch(err =>
      res.status(500).json({ message: 'Error retrieving zoos.', err }),
    );
};

const getById = (req, res) => {
  res.json(req.zoo);
};

const update = (req, res) => {
  const { id } = req.params;
  const zoo = req.body;

  db
    .update(tbl, id, zoo)
    .then(editedFields => {
      db
        .getById(tbl, id)
        .then(zoo => res.json(zoo))
        .catch(err =>
          res.status(500).json({
            message: `Error retrieving updated zoo for id ${id}`,
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
      res.status(500).json({ message: 'Error deleting zoo.', err }),
    );
};

const checkId = (req, res, next) => {
  const { id } = req.params;

  db
    .getById(tbl, id)
    .then(zoo => {
      if (!zoo) {
        res.status(404).json({
          message: `No zoo with id ${id} was found.`,
          err: `Query returned ${zoo}.`,
        });
        return;
      }

      req.zoo = zoo;
      next();
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: `Error retrieving zoo with id ${id}`, err }),
    );
};

module.exports = {
  create,
  get,
  getById,
  update,
  del,
  checkId,
};
