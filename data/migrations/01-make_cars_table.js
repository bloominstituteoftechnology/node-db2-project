// DO YOUR MAGIC
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cars', function(table) {
        // id int unsigned not null auto_increment primary key
        // @see http://knexjs.org/#Schema-increments
        table.increments();
        table.string('vin').notNullable();
        table.string('make').notNullable();
        table.string('model').notNullable();
        table.integer('mileage').notNullable();
        table.string('title');
        table.string('transmission');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        // Constraints
        table.unique('vin');
    })
}
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cars');
}