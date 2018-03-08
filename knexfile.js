// Update with your config settings.

module.exports = {


  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'zoos_db',
      user:     'dave',
      password: 'lolpen15'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {

      directory: './database/seeds',
    },
  },

};
