// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3'
    },
    useNullAsDefault:true
  },
  development2: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambdaBears.db'
    },
    useNullAsDefault: true
  },
};
