const db = require("../../data/db-config");

const getAll = async () => {
  const result = await db("cars");

  return result;
};

const getById = async (id) => {
  const result = await db("cars").where("id", id).first();
  return result;
};

const create = async (car) => {
  const [id] = await db("cars").insert(car);
  const post = await getById(id);
  return post;
};

module.exports = {
  getAll,
  getById,
  create,
};
