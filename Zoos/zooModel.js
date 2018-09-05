const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {

    get: (id)=>{
        let zoos = db('zoos');
        if(id){
            zoos
                .select('name')
                .where({'id':id});
            return zoos
        }
        return zoos;
    },

    insert: (post)=>{
        return db.insert(post)
            .into('zoos')
            .then(ids => ({ id: ids[0]}));
    },

    update: (id, zoo)=>{
        return db('zoos')
            .where('id', id)
            .update(zoo);
    },

    delete: (id)=>{
        return db('zoos')
            .where('id', id)
            .del();
    }

}