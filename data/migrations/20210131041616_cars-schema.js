
exports.up = function(knex) {
  return knex.schema.createTable('cars',table =>{
      table.increments('id');
      table.string('name', 50).notNullable();
      table.string('model',15).notNullable();
      table.string('condition').notNullable();
      table.float('price',6).notNullable();
      table.string('description',150);
      table.string('color',15);
      table.string('transmission',15);
      table.integer('wheels',1);
      table.string('make',10);
      table.string('vin',15);
      table.string('mileage',10);
      table.string('status',10);

    



  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
