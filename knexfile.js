// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/car-dealer.db3'
    },
    useNullAsDefault: true,
    migrations: {
      // tableName
      directory: './data/migrations'
    },

    seeds: {
      directory: './data/seeds',
    },
  },

  staging: {

  },

  production: {

  }
 
  

};
