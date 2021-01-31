// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/cars.db3'
    }
  },

  

  
    migrations: {
      tableName: 'knex_migrations'
    }
  

};
