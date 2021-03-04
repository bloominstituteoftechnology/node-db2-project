const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars')
    .where('id', id)
    .first()
}

const addNew = (car) => {
  // DO YOUR MAGIC
  return db("car")
    .insert(car, "id")
    .then(([id]) => getById(id))
}

const updateById = (id, changes) => {
  // DO YOUR MAGIC
  if (id) {
  return db('cars')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? getById(id) : null));
  }
}

const removeById = id => {
  // DO YOUR MAGIC
  if (id) {
    return db('cars')
      .where('id', id)
      .del()
  }
}

module.exports = {
  getAll,
  getById,
  addNew,
  updateById,
  removeById
}
