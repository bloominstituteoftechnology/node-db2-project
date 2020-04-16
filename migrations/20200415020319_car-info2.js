
exports.up = function(knex) {
    return knex.schema.createTable("carr", tbl=>{
        tbl.increments('id');
        tbl.integer( "VIN").unique().notNullable();
        tbl.string("make").notNullable();
        tbl.string("model").notNullable();
        tbl.integer("meilage").notNullable();
      
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("carr")
  
};