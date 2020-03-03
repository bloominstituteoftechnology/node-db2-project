module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/cars.db3'
      },
      useNullAsDefault: true,
      migrations: {
        directory: './data/migrations'
      }
    },
  };