const db = require("../../data/dbConfig");

module.exports = {
  find,
  findById,
  post,
};

function find() {
  return db("cars");
}
function findById(id) {
  return db("cars").where("id", id).first();
}

function post(post) {
  return db("cars")
    .insert(post)
    .then(([id]) => {
      return db("cars").where("id", id);
    });
}
