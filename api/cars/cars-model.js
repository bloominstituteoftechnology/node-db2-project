const db = require("../../data/db-config");

const getAll = () => {
  return db("cars").select();
};

const getById = (id) => {
  return db("cars").select().where({ id }).first();
};

const getByVin = (vin) => {
  return db("cars").select().where({ vin }).first();
};

const create = async (car) => {
  const [id] = await db("cars").insert(car);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  getByVin,
  create,
};
