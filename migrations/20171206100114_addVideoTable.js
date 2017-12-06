
exports.up = function(knex, Promise) {
  // what happens when we run the migrations
  return knex.schema.createTable('videos', (tbl) => {
    tbl.increments('video_id');
    tbl.integer('user_id')
    .notNullable()
    .references('id')
    .inTable('users');
    tbl.string('video_name', 255).notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  // to roll back or undo the changes
  return knex.schema.dropTableIfExists('videos');
};

