// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/practice.sqlite3'
    },
    useNullAsDefault: true
  },


  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'practice',
      user:     'root',
      password: 'L0ckedD0wn1'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};


