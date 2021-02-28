const db = require("../../data/dbConfig");

module.exports = {
  getAll,
  getById,
  create,
};

const getAll = () => {
  return db("cars");
}

const getById = (id) => {
  return db("cars").where("id", id).first();
}

const create = () => {
  return db("cars")
    .insert(create)
    .then(([id]) => {
      return db("cars").where("id", id);
    });
}
