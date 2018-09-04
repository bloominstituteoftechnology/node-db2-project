const knex = require('knex');
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  get: () => {
    return db("zoos")
      .then((rows) => {
        return(rows);
      })
      .catch(function(error) {
        console.error(error);
      });
  }
};
