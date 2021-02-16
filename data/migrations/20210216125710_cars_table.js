
exports.up = function(knex) {
  return knex.schema.createTable('cars', table =>{
      table.increments()
      table.text('vin',17).unique().notNullable()
      table.text('make',30)
      table.text('model',70)
      table.text('mileage',100000)
      table.text('transmission',50)
      table.text('titlestatus',50)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
