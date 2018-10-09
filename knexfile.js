// Update with your config settings.

module.exports = {

  // Development instance using sqlite3.
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true,
  }
};
