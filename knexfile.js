// Update with your config settings.

module.exports = {
  development: {
      client: 'sqlite3',
      connection: {
        filename: './data/lambda.sqlite3',    // update path 
    },
    useNullAsDefault: true, // add this line 
  },
  // production: {

  // }
};

