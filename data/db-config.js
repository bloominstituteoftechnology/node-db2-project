const knex=require('knex');

const config=require('../knexfile');

const dbConfig=knex(config.development);

module.exports=dbConfig;
