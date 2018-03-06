const knex = require('../../database/db');

const create = (req, res) => {
  const name = req.name;

  //   const { zoo } = req.body;
  //   knex.insert(zoo).into('zoos').then().catch()

  knex('zoos')
    .insert({ name })
    .then(id => {
      res.status(200).json({ id: id[0] });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error inserting zoo.', err }),
    );
};

const get = (req, res) => {
  knex('zoos')
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
  const id = req.id;

  knex('zoos')
    .where('id', id)
    .first()
    .then(zoo => {
      if (!zoo) {
        res.status(404).json({
          message: `No zoo with id ${id} was found.`,
          err: 'Query returned undefined.',
        });
        return;
      }

      res.json(zoo);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: `Error retrieving zoo with id ${id}`, err }),
    );
};

const edit = (req, res) => {
  const id = req.id;
  const name = req.name;

  knex('zoos')
    .where({ id: id })
    .update({ name })
    .then(editedFields => {
      if (!editedFields) {
        res.status(404).json({
          message: `Zoo with id ${id} was not edited.`,
          err: `Query returned ${editedFields} edited fields.`,
        });
        return;
      }

      knex('zoos')
        .where({ id: id })
        .first()
        .then(zoo => res.json(zoo));
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: `Error updating zoo with id ${id}`, err }),
    );
};

const del = (req, res) => {
  const id = req.id;

  knex('zoos')
    .where('id', id)
    .del()
    .then(deleted => {
      if (!deleted) {
        res.status(404).json({
          message: `No zoo with id ${id} was found.`,
          err: `Query returned ${deleted}`,
        });
        return;
      }

      res.json({ deleted: true });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error deleting zoo.', err }),
    );
};

const zoo = {
  create,
  get,
  getById,
  edit,
  del,
};

module.exports = zoo;
