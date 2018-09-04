// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true, 
    log: {
      warn(message) {
      },
      error(message) {
      },
      deprecate(message) {
      },
      debug(message) {
      },
    }
  },
};
