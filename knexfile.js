// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/car-dealer.db3'
    },
    useNullAsDefauly: true,
    migrations: {
      directory: './data/migrations'
    }
  },

};
