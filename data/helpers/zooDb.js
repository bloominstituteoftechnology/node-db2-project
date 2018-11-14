const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('zoos');
    if (id) query.where('id', Number(id)).first();
    return query;
  },
  insert: function(zoo) {
    return db('zoos')
      .insert(zoo)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, zoo) {
    return db('zoos')
      .where('id', id)
      .update(zoo);
  },
  remove: function(id) {
    return db('zoos')
      .where('id', id)
      .del();
  }
};
