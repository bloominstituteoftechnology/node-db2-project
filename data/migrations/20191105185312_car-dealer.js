
exports.up = function(knex) {
    return knex.schema.createTable('cars', function(table){
        table.increments();
        table.string(`vin`, 128).notNullable();
        table.string(`make`, 128).notNullable();
        table.string(`model`, 128).notNullable();
        table.integer(`mileage`).notNullable();
        table.timestamps();
    })
};

exports.down = function(knex) {
  
};
