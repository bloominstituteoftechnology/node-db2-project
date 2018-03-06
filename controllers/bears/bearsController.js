const knex = require('../../database/db');

const create = (req, res) => {
  const { zooId, species, latinName } = req.body;

  knex('bears')
    .insert({
      zooId,
      species,
      latinName,
    })
    .then(id => res.json({ id: id[0] }))
    .catch(err => res.status(500).json({ message: 'Error saving bear.', err }));
};

const get = (req, res) => {
  knex('bears')
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

  knex('bears')
    .where('id', id)
    .first()
    .then(bear => {
      if (!bear) {
        res.status(404).json({
          message: `No bear with id ${id} was found.`,
          err: 'Query returned undefined.',
        });
        return;
      }

      res.json(bear);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: `Error retrieving bear with id ${id}`, err }),
    );
};

const edit = (req, res) => {
  const id = req.id;
  const { zooId, species, latinName } = req.body;

  knex('bears')
    .where({ id: id })
    .update({ zooId, species, latinName })
    .then(updatedId => {
      if (!updatedId) {
        res.status(404).json({
          message: `No zoo with id ${id} was found.`,
          err: `Query returned id ${updatedId}.`,
        });
        return;
      }

      res.json({ id: id });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: `Error updating zoo with id ${id}`, err }),
    );
};

const del = (req, res) => {
  const id = req.id;

  knex('bears')
    .where('id', id)
    .del()
    .then(deleted => {
      if (!deleted) {
        res.status(404).json({
          message: `No bear with id ${id} was found.`,
          err: `Query returned ${deleted}`,
        });
        return;
      }

      res.json({ deleted: true });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error deleting bear.', err }),
    );
};

module.exports = { create, get, getById, edit, del };
