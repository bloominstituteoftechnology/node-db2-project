
exports.up = function(knex) {
  // Change we want to make to our schema
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.integer("vin")
        .unique()
        .notNullable();
      tbl.text('make')
        .notNullable()
      tbl.text('model')
        .notNullable()
      tbl.integer("mileage")
        .notNullable()
      tbl.text('transmissiontype')
        .nullable()
      tbl.text('title')
        .nullable()
  })
};

exports.down = function(knex) {
    // undoing that change
    return knex.schema.dropTableIfExists('cars');
  
};
