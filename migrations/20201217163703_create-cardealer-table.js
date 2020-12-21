
exports.up = async function(knex) {
    await knex.schema.createTable('CarDealerShip',tbl=>{
      tbl.increments();
      
      tbl.text('CarMake',25)
      .notNullable();
      
      tbl.text('CarModel',25)
      .notNullable();
      
      tbl.integer('CarYear',4)
      .notNullable();
      
      tbl.integer('CarMileage',9);
      
      tbl.boolean('Foreign')
      .defaultTo(false);
      
      tbl.text('Color',30)
      .notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('CarDealerShip');
};
