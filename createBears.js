const db = require('knex')(require('./knexfile').development);

db.schema
  .createTable('bears', function(bears) {
    bears.increments();
    bears
      .string('name', 128)
      .unique()
      .notNullable();

    console.log('Bears table created successfully');
  })
  .then(data => {
    console.log(data);
    process.exit(0);
  })
  .catch(console.log);
