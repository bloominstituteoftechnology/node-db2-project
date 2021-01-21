module.exports = {
  development: {
    client: 'sqlite3', // driver
    connection: { // in other platforms, this would be a server
      filename: './data/car-dealer.db3',
    },
    useNullAsDefault: true, // a sqlite3 thing
    // generates migration files in a data/migrations/folder
    migrations: {
      directory: './data/migrations',
    },
    // generates seed files in a data/migrations/folder
    seeds: {
      directory: './data/seeds',
    },
  },

  staging: {

  },

  production: {

  }
};
