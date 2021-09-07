const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = async (id) => {
  const result = await db("cars").where("id", id).first();
  return result;
};

const create = async (car) => {
  const [id] = await db("cars").insert(car);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
};
