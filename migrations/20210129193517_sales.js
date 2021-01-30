
exports.up = async function(knex) {
  await knex.schema.createTable('carsale',(table)=>{
      table.increments();
      table.integer('carId')
           .notNullable()
           .references('id')
           .inTable('cars')
           .onUpdate('CASCADE')
           .onDelete('CASCADE')
      table.boolean('sold')
      table.float('price')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('carsale')
 
};
