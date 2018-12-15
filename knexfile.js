module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/lambda.db'
      },
      useNullAsDefault: true
    },
  };