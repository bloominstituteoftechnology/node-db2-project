const db = require('../data/db-config.js');

module.exports = {
  getAll,
  getById,
  create,
};

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars');

}

const getById = (id) => {
  // DO YOUR MAGIC
  let query = db('cars');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((action) => {
        if (action) {
          return mappers.actionToBody(action);
        } else {
          return null;
        }
      });
  } else {
    return query.then((actions) => {
      return actions.map((action) => mappers.actionToBody(action));
    });
  }
}

const create = (action) => {
  // DO YOUR MAGIC
  return db('cars')
  .insert(action, 'id')
  .then(([id]) => get(id));
}
