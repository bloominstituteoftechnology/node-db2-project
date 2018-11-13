// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './courses.sqlite3'
    },
    useNullAsDefault: true
  }
};
