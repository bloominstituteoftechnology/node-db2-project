module.exports = {
  client: "sqlite3", //specifiying DBMS
  connection: {
    filename: "./data/produce.db3l", //location of our database file
  },
  useNullAsDefault: true, //a flag required for SQlite specifically
};
