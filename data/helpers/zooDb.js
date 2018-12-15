const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('zoos')
    if (id) {
      query.where('id', id);
    }
    return query;
  }
}