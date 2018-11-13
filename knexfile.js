module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './zoos.sqlite3'
    },
    useNullAsDefault: true
  }
};
