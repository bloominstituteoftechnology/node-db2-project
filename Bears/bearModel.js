const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
    
    get: (id)=>{
        let bears = db('bears');
        if(id){
            bears
                .select('name')
                .where({'id':id});
            return bears
        }
        return bears;
    },

    insert: (post)=>{
        return db.insert(post)
            .into('bears')
            .then(ids => ({ id: ids[0]}));
    },

    update: (id, zoo)=>{
        return db('bears')
            .where('id', id)
            .update(zoo);
    },

    delete: (id)=>{
        return db('bears')
            .where('id', id)
            .del();
    }

}