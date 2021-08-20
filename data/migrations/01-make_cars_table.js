exports.up = function (knex) {
  // DO YOUR MAGIC

  exports.up = function(knex, Promise) {
    return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('name')
        .notNullable()
        .unique();
      tbl.string('make')
        .notNullable();
        tbl.string('model')
        .notNullable();
        tbl.string('mileage')
        .notNullable();
        
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cars');
  };
  
};

exports.down = function (knex) {
  // DO YOUR MAGIC
};
