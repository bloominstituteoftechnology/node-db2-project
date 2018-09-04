const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  get: (id) => {
    if (id) {
      return db("zoos")
        .where({"id": id})
        .then(rows => {
          console.log(rows);
          return rows;
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      return db("zoos")
        .then(rows => {
          return rows;
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  delete:(id)=>{
    return db("zoos")
    .where({"id":id})
    .del();
  },
  insert: (body)=>{
    return db("zoos")
    .insert({...body})
  },
  edit: (id, body)=>{
    return db("zoos")
    .where({"id":id})
    .update({...body})
  }
};
