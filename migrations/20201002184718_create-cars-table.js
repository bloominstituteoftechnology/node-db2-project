
exports.up = function(knex) {
    return knex.schema.createTable('car-dealer', tbl => {
        tbl.increments()
        tbl.text('name')
        tbl.timestamps(true, true)
    })
    .createTable('message', tbl => {
        tbl.increments()
        tbl.string('sender')
        .index()
        tbl.text('text')
        .notNullable()
        tbl.timestamps(true, true)
        
        tbl.integer(car-dealer_id)
        .unsigned()
        .reference('id')
        .inTable('car-dealer')
         onDelete('CASCADE')
         ontimeupdate('CASCADE')

    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfexists().dropTableIfexists
};
