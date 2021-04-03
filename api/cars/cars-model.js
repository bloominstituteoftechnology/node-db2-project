const db = require("../../data/db-config");


const getAll = () => {
  // DO YOUR MAGIC
return db("cars");

}

const getById = () => {
  // DO YOUR MAGIC
  return db("cars").where("car_id", id).first();

}

const create = () => {
  // DO YOUR MAGIC
  const [id] = await db("cars").insert(car);
  return getById(id);

}

module.exports = {
  getAll,
  getById,
  create,
}