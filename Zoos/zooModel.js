const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    get: (id)=>{
        let zoos = db('zoos');
        if(id){
            zoos
                .select('name')
                .where('id',id)
        }
    }
}