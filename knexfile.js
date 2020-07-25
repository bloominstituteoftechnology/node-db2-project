// Update with your config settings.

module.exports = {

  development: {
    client: 'dblite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: { }
  },


};
