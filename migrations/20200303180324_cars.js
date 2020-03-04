
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        //ID
        table.increments('id');
        // VIN
        table.integer('VIN').notNull().unique();
        // Make
        table.text('make').notNull();
        // Model
        table.text('model').notNull();
        // Mileage
        table.integer('mileage').notNull();
        // Title Status
        table.text('title')
      });
};

exports.down = function(knex) {
    //Delete
    return knex.schema.dropTableIfExists('cars')
};
