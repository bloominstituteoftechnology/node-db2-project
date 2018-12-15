const db = require("../dbConfig.js");

module.exports = {
  get: function(id) {
    let query = db("bears");
    if (id) {
      query.where("id", id);
    }
    return query;
  },
  insert: function(bear) {
    return db("bears")
      .insert(bear)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, bear) {
    return db("bears")
      .where("id", id)
      .update(bear);
  },
  remove: function(id) {
    return db("bears")
      .where("id", id)
      .del();
  }
};
