
exports.up = function(knex, Promise) {
    return knex.schema.createTable( 'bears', function(tbl){
        tbl.increments(); //creates primary key called id

        tbl.integer('zoo_id').unsigned().references('id').inTable('zoos');

        tbl.string('species', 80)
        .notNullable()//required must have value
        .unique('name');//values should be unique

        tbl.string('latinName', 80)
        .notNullable()//required must have value
        

        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
   //is for undoing changes to db
   return knex.schema.dropTableIfExists('bears')
};
