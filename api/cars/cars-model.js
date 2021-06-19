const db = require("../../data/db-config.js");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where("id", id).first();
};

const create = async (account) => {
  const[id] = await db("accounts").insert(account);
  return getById(id);
};

module.exports {
getAll,
getById,
create
}