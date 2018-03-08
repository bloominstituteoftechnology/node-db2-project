
exports.up = function(knex, Promise) { 
    //is for making changes to db
    return knex.schema.createTable( 'zoos', function(tbl){
        tbl.increments(); //creates primary key called id

        tbl.string('name', 255)
        .notNullable()//required must have value
        .unique('name');//values should be unique

        tbl.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) { 
    //is for undoing changes to db
    return knex.schema.dropTableIfExists('zoos')
};
