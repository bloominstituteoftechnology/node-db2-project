// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3', //tells knex that we're using the SQLite3 driver
    connection: {
      filename: './data/lambda.sqlite3' // update this with the location of your database file
    },
    useNullAsDefault: true, // new configuration for SQLite 
  },
};

// Configure knex to connect to /data/lambda.sqlite3 using the sqlite3 module.