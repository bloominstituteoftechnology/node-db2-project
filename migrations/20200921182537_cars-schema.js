
exports.up = function(knex) {
 return  knex.schema.creatTable('cars', tbl =>{
     tbl.increments('id');
 } )
};

exports.down = function(knex) {
  
};
