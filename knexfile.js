module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './migrations/car.db3'
    },
    useNullAsDefault: true
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './migrations/seeds'
  }
};