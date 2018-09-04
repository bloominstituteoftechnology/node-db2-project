const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  get: (id,which) => {
    if (id) {
      return db(which)
        .where({"id": id})
        .then(rows => {
          console.log(rows);
          return rows;
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      return db(which)
        .then(rows => {
          return rows;
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  delete:(id,which)=>{
    return db(which)
    .where({"id":id})
    .del();
  },
  insert: (body,which)=>{
    return db(which)
    .insert({...body})
  },
  edit: (id, body,which)=>{
    return db(which)
    .where({"id":id})
    .update({...body})
  }
};
