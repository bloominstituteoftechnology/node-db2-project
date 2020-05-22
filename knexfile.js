// Update with your config settings.

module.exports = {

  //-----------------------------------------------------
  // Sqlite3 Connection
  //-----------------------------------------------------

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/car.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  //-----------------------------------------------------
  // Postgres Connection
  //-----------------------------------------------------

  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'car',
      user: 'postgres',
      password: 'hamidi'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  }
}

