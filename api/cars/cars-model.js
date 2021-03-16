const db = require("../../data/db-config");

module.exports = {
  getAll,
  getById,
  create,
};

const getAll = () => {
  // DO YOUR MAGIC
  return db("cars");
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("cars").where({ id }).first();
};

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await db("cars").insert(car);
  return getById(id);
};
